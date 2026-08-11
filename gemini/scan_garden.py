#!/usr/bin/env python3
import os
import re
import sys
from collections import defaultdict

GARDEN_DIR = '/home/flancian/garden'
GEMINI_DIR = os.path.join(GARDEN_DIR, 'gemini')

# Ensure gemini directory exists
os.makedirs(GEMINI_DIR, exist_ok=True)

# Regex patterns
LINK_RE = re.compile(r'\[\[([^\]|]+)(?:\|[^\]]*)?\]\]')
# Catch both markdown todo checkboxes '- [ ]' and code/text comments 'TODO' / 'FIXME'
TODO_RE = re.compile(r'(?:-\s*\[\s*\]|\bTODO\b|\bFIXME\b)', re.IGNORECASE)
TENSION_RE = re.compile(r'\b(contradict|contradiction|conflict|tension|clash|disagree|oppose|contrary)\b', re.IGNORECASE)
RESEARCH_RE = re.compile(r'\b(research direction|research thread|promising thread|action item|roadmap|milestone|agenda|promising area)\b', re.IGNORECASE)

def normalize_concept(name):
    # Strip whitespace, lowercase, remove extensions, replace dashes/underscores with spaces
    name = os.path.basename(name)
    if name.endswith('.md'):
        name = name[:-3]
    name = name.strip().lower()
    name = re.sub(r'[\s_\-]+', ' ', name)
    return name.strip()

def main():
    print("Starting scan of the digital garden...")
    
    # Map from concept name -> relative file path
    concept_to_file = {}
    file_to_concept = {}
    
    # Store items
    todos = []          # List of (file_rel, line_num, content)
    tensions = []       # List of (file_rel, line_num, content)
    research_items = [] # List of (file_rel, line_num, content)
    
    # Graph structure
    links_from = defaultdict(set) # source_concept -> target_concepts
    links_to = defaultdict(set)   # target_concept -> source_concepts
    
    # Read files
    for root, dirs, files in os.walk(GARDEN_DIR):
        # Exclude directories we don't want to search
        dirs[:] = [d for d in dirs if d not in ('.git', '.obsidian', '.agents', 'gemini')]
        
        for file in files:
            if not file.endswith('.md'):
                continue
                
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, GARDEN_DIR)
            concept = normalize_concept(file)
            
            concept_to_file[concept] = rel_path
            file_to_concept[rel_path] = concept

            try:
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                    for i, line in enumerate(f, 1):
                        line_stripped = line.strip()
                        if not line_stripped:
                            continue
                            
                        # Search for TODOs
                        if TODO_RE.search(line_stripped):
                            todos.append((rel_path, i, line_stripped))
                            
                        # Search for Tensions/Contradictions
                        if TENSION_RE.search(line_stripped):
                            tensions.append((rel_path, i, line_stripped))
                            
                        # Search for Research/Actions
                        if RESEARCH_RE.search(line_stripped):
                            research_items.append((rel_path, i, line_stripped))
                            
                        # Parse out-going links
                        for match in LINK_RE.finditer(line_stripped):
                            target_raw = match.group(1)
                            target_concept = normalize_concept(target_raw)
                            links_from[concept].add(target_concept)
            except Exception as e:
                print(f"Error reading {rel_path}: {e}")
                
    # Build incoming links structure
    all_known_concepts = set(concept_to_file.keys())
    for src, targets in links_from.items():
        for tgt in targets:
            links_to[tgt].add(src)
            all_known_concepts.add(tgt)
            
    print(f"Total files scanned: {len(file_to_concept)}")
    print(f"Total unique concepts recognized: {len(all_known_concepts)}")
    
    # Write TODOs report
    write_todos_report(todos)
    
    # Write Structure report (hubs, orphans, dead ends, empty spaces)
    write_structure_report(concept_to_file, links_from, links_to, all_known_concepts)
    
    # Write Conceptual report (tensions, research threads)
    write_conceptual_report(tensions, research_items)
    
    # Write Unified Dashboard
    write_dashboard(file_to_concept, concept_to_file, all_known_concepts, todos, tensions, research_items, links_from, links_to)
    
    print("Garden review complete. Reports written to gemini/")

def write_todos_report(todos):
    report_path = os.path.join(GEMINI_DIR, 'todos_report.md')
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Digital Garden Review: Open TODOs\n\n")
        f.write(f"This report lists all **{len(todos)}** open tasks and TODO items discovered in the garden.\n\n")
        
        # Group by file
        by_file = defaultdict(list)
        for rel_path, line_num, content in todos:
            by_file[rel_path].append((line_num, content))
            
        f.write("## Summary of Tasks by Node\n\n")
        for rel_path in sorted(by_file.keys()):
            f.write(f"### [{os.path.basename(rel_path)}](file://{os.path.join(GARDEN_DIR, rel_path)})\n")
            for line_num, content in by_file[rel_path]:
                # Clean up the output a bit
                clean_content = content.replace('- [ ]', '☐').strip()
                f.write(f"- **Line {line_num}**: `{clean_content}`\n")
            f.write("\n")

def write_structure_report(concept_to_file, links_from, links_to, all_known_concepts):
    report_path = os.path.join(GEMINI_DIR, 'structure_report.md')
    
    # Orphans: exists in garden, in-degree = 0 (and not a journal file)
    orphans = []
    # Dead ends: exists in garden, out-degree = 0
    dead_ends = []
    # Empty spaces: doesn't exist in garden, in-degree > 0
    empty_spaces = []
    
    for concept in all_known_concepts:
        exists = concept in concept_to_file
        in_degree = len(links_to[concept])
        out_degree = len(links_from[concept])
        
        if exists:
            rel_path = concept_to_file[concept]
            is_journal = 'journal/' in rel_path.lower() or re.match(r'^\d{4}-\d{2}-\d{2}', os.path.basename(rel_path))
            if in_degree == 0 and not is_journal:
                orphans.append((concept, rel_path))
            if out_degree == 0:
                dead_ends.append((concept, rel_path))
        else:
            empty_spaces.append((concept, in_degree))
            
    # Hubs by in-degree
    hubs_in = []
    for concept, sources in links_to.items():
        if concept in concept_to_file:
            hubs_in.append((concept, len(sources), concept_to_file[concept]))
    hubs_in.sort(key=lambda x: x[1], reverse=True)
    
    # Hubs by out-degree
    hubs_out = []
    for concept, targets in links_from.items():
        if concept in concept_to_file:
            hubs_out.append((concept, len(targets), concept_to_file[concept]))
    hubs_out.sort(key=lambda x: x[1], reverse=True)
    
    empty_spaces.sort(key=lambda x: x[1], reverse=True)
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Digital Garden Review: Structural Analysis\n\n")
        
        f.write("## 1. Central Hubs (Most Linked-To Nodes)\n")
        f.write("These concepts are the key anchors of your knowledge base, receiving the most incoming links:\n\n")
        f.write("| Concept | Incoming Links | File Link |\n")
        f.write("| --- | --- | --- |\n")
        for concept, count, rel_path in hubs_in[:30]:
            f.write(f"| `[[{concept}]]` | {count} | [{os.path.basename(rel_path)}](file://{os.path.join(GARDEN_DIR, rel_path)}) |\n")
            
        f.write("\n## 2. Empty Spaces (Most Wanted Nodes)\n")
        f.write("These nodes are linked to from other pages, but **do not yet have a corresponding file** in the garden. Under the Agora protocol, these represent welcoming entryways waiting to be written:\n\n")
        f.write("| Concept Name | Incoming Link Count | Linked From (Examples) |\n")
        f.write("| --- | --- | --- |\n")
        for concept, count in empty_spaces[:30]:
            linked_from = list(links_to[concept])[:3]
            linked_from_str = ", ".join([f"`[[{src}]]`" for src in linked_from])
            f.write(f"| `[[{concept}]]` | {count} | {linked_from_str} |\n")
            
        f.write("\n## 3. Orphaned Nodes (Non-Journal)\n")
        f.write("These files exist but have **zero incoming links** from anywhere else in the garden (excluding daily journal logs). They are isolated islands:\n\n")
        for concept, rel_path in sorted(orphans[:50], key=lambda x: x[0]):
            f.write(f"- [{os.path.basename(rel_path)}](file://{os.path.join(GARDEN_DIR, rel_path)}) (`[[{concept}]]`)\n")
            
        f.write("\n## 4. Dead Ends\n")
        f.write("These nodes exist in your garden but contain **zero outgoing wikilinks** to other concepts. They do not lead the traveler onward:\n\n")
        for concept, rel_path in sorted(dead_ends[:50], key=lambda x: x[0]):
            f.write(f"- [{os.path.basename(rel_path)}](file://{os.path.join(GARDEN_DIR, rel_path)}) (`[[{concept}]]`)\n")

def write_conceptual_report(tensions, research_items):
    report_path = os.path.join(GEMINI_DIR, 'conceptual_report.md')
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Digital Garden Review: Conceptual Analysis\n\n")
        
        f.write("## 1. Tensions, Disagreements, and Contradictions\n")
        f.write("This section highlights files containing words that imply tension, debate, or potential contradictions (e.g., 'conflict', 'contradict', 'disagree', 'clash'). These represent cognitive nodes that might benefit from resolution or synthesis:\n\n")
        
        by_file_t = defaultdict(list)
        for rel_path, line_num, content in tensions:
            by_file_t[rel_path].append((line_num, content))
            
        for rel_path in sorted(by_file_t.keys()):
            f.write(f"### [{os.path.basename(rel_path)}](file://{os.path.join(GARDEN_DIR, rel_path)})\n")
            for line_num, content in by_file_t[rel_path][:5]: # cap at 5 per file to keep it readable
                f.write(f"- **Line {line_num}**: {content.strip()}\n")
            f.write("\n")
            
        f.write("## 2. Promising Threads of Research and Action\n")
        f.write("This section tracks items that mention research directions, action items, roadmaps, or milestones, showing where your garden points toward future progress:\n\n")
        
        by_file_r = defaultdict(list)
        for rel_path, line_num, content in research_items:
            by_file_r[rel_path].append((line_num, content))
            
        for rel_path in sorted(by_file_r.keys()):
            f.write(f"### [{os.path.basename(rel_path)}](file://{os.path.join(GARDEN_DIR, rel_path)})\n")
            for line_num, content in by_file_r[rel_path][:5]:
                f.write(f"- **Line {line_num}**: {content.strip()}\n")
            f.write("\n")

def write_dashboard(file_to_concept, concept_to_file, all_known_concepts, todos, tensions, research_items, links_from, links_to):
    report_path = os.path.join(GEMINI_DIR, 'garden_review_dashboard.md')
    
    # Calculate statistics
    total_files = len(file_to_concept)
    total_concepts = len(all_known_concepts)
    total_links = sum(len(targets) for targets in links_from.values())
    avg_out_degree = total_links / total_files if total_files > 0 else 0
    
    empty_count = sum(1 for c in all_known_concepts if c not in concept_to_file)
    
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write("# Agora Garden Stewardship Dashboard 🌿\n\n")
        f.write("Welcome, Gardener. This dashboard synthesizes the structure, tasks, and conceptual flows of your digital garden.\n\n")
        
        f.write("## 📊 Garden Metrics\n\n")
        f.write(f"- **Total Files (Garden Nodes)**: {total_files}\n")
        f.write(f"- **Total Conceptual Nodes (including empty spaces)**: {total_concepts}\n")
        f.write(f"- **Empty Spaces (Linked but non-existent nodes)**: {empty_count} ({empty_count/total_concepts*100:.1f}% of graph)\n")
        f.write(f"- **Total WikiLinks**: {total_links}\n")
        f.write(f"- **Average Outgoing Links per Node**: {avg_out_degree:.2f}\n")
        f.write(f"- **Open TODOs/Checkboxes**: {len(todos)}\n")
        f.write(f"- **Tension Markers (conflict/contradict)**: {len(tensions)}\n")
        f.write(f"- **Research / Roadmap Markers**: {len(research_items)}\n\n")
        
        f.write("## 🗂️ Reports Reference\n\n")
        f.write(f"1. **[Open TODOs Report](file://{os.path.join(GEMINI_DIR, 'todos_report.md')})** — Contains the list of all tasks.\n")
        f.write(f"2. **[Structural Analysis Report](file://{os.path.join(GEMINI_DIR, 'structure_report.md')})** — Identifies hubs, orphans, empty spaces, and dead ends.\n")
        f.write(f"3. **[Conceptual Analysis Report](file://{os.path.join(GEMINI_DIR, 'conceptual_report.md')})** — Summarizes tensions and action threads.\n\n")
        
        f.write("## 🚪 Tending the Doorways (Top 5 Immediate Actions)\n\n")
        f.write("Based on the scan, here are five immediate stewardship actions to improve the garden:\n\n")
        
        # Identify top empty spaces
        empty_spaces = []
        for concept in all_known_concepts:
            if concept not in concept_to_file:
                empty_spaces.append((concept, len(links_to[concept])))
        empty_spaces.sort(key=lambda x: x[1], reverse=True)
        
        f.write("1. **Resolve empty spaces**: The following highly-linked concepts don't exist yet. Consider seeding them:\n")
        for c, count in empty_spaces[:3]:
            f.write(f"   - `[[{c}]]` (linked from {count} nodes)\n")
            
        # Get some orphan
        orphans = []
        for concept in all_known_concepts:
            if concept in concept_to_file:
                rel_path = concept_to_file[concept]
                is_journal = 'journal/' in rel_path.lower() or re.match(r'^\d{4}-\d{2}-\d{2}', os.path.basename(rel_path))
                if len(links_to[concept]) == 0 and not is_journal:
                    orphans.append((concept, rel_path))
        
        if orphans:
            f.write(f"2. **Connect orphans**: Link the isolated page [{os.path.basename(orphans[0][1])}](file://{os.path.join(GARDEN_DIR, orphans[0][1])}) to other nodes.\n")
            
        # Get some tension file
        if tensions:
            f.write(f"3. **Synthesize conceptual tension**: Review conflict references in [{os.path.basename(tensions[0][0])}](file://{os.path.join(GARDEN_DIR, tensions[0][0])}) on Line {tensions[0][1]}.\n")

if __name__ == '__main__':
    main()
