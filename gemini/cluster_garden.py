#!/usr/bin/env python3
import os
import re
import json
from collections import deque, defaultdict

GARDEN_DIR = '/home/flancian/garden'
GEMINI_DIR = os.path.join(GARDEN_DIR, 'gemini')

# Themes and their seed concepts (must be normalized concept names)
THEMES = {
    "agora_commons": {
        "label": "Agora & Knowledge Commons",
        "seeds": ["agora", "agora protocol", "knowledge commons", "digital garden", "an agora is what google could be", "commons"]
    },
    "flancia_protopia": {
        "label": "Flancia & Social Systems",
        "seeds": ["flancia", "protopia", "protopias", "moloch", "open letter to moloch", "coordination failure", "democracy"]
    },
    "buddhism_mindfulness": {
        "label": "Buddhism, Ethics & Maitreya",
        "seeds": ["buddhism", "maitreya", "paramita", "meditation", "mindfulness", "bodhisattvas", "dharma"]
    },
    "sre_engineering": {
        "label": "SRE & Systems Engineering",
        "seeds": ["sre", "google", "git", "sqlite", "architecture", "devops", "software"]
    },
    "culture_art_media": {
        "label": "Culture, Literature & Art",
        "seeds": ["poetry", "literature", "art", "music", "argentina", "macedonio fernandez", "book"]
    }
}

# Regex to detect journal files
JOURNAL_RE = re.compile(r'^(?:journal/)?\d{4}[-_]\d{2}[-_]\d{2}', re.IGNORECASE)

def normalize_concept(name):
    name = os.path.basename(name)
    if name.endswith('.md'):
        name = name[:-3]
    name = name.strip().lower()
    name = re.sub(r'[\s_\-]+', ' ', name)
    return name.strip()

def build_graph():
    concept_to_file = {}
    edges = defaultdict(set)
    all_concepts = set()
    
    # Walk the garden
    for root, dirs, files in os.walk(GARDEN_DIR):
        dirs[:] = [d for d in dirs if d not in ('.git', '.obsidian', '.agents', 'gemini')]
        
        for file in files:
            if not file.endswith('.md'):
                continue
                
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, GARDEN_DIR)
            concept = normalize_concept(file)
            
            concept_to_file[concept] = rel_path
            all_concepts.add(concept)
            
            # Read links
            try:
                with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    # Find all wikilinks
                    links = re.findall(r'\[\[([^\]|]+)(?:\|[^\]]*)?\]\]', content)
                    for link in links:
                        target = normalize_concept(link)
                        # We only create edges between concepts that exist as files in the garden
                        edges[concept].add(target)
                        edges[target].add(concept)
            except Exception as e:
                pass
                
    return concept_to_file, edges, all_concepts

def multi_source_bfs(seeds, edges, all_concepts):
    """Returns a dict of node -> distance from the seed set."""
    distances = {node: float('inf') for node in all_concepts}
    queue = deque()
    
    # Initialize seeds
    for seed in seeds:
        if seed in distances:
            distances[seed] = 0
            queue.append(seed)
            
    while queue:
        current = queue.popleft()
        current_dist = distances[current]
        
        for neighbor in edges[current]:
            if neighbor in distances and distances[neighbor] == float('inf'):
                distances[neighbor] = current_dist + 1
                queue.append(neighbor)
                
    return distances

def main():
    print("Building garden graph...")
    concept_to_file, edges, all_concepts = build_graph()
    print(f"Loaded {len(concept_to_file)} files.")
    
    # Compute distances for each conceptual theme
    theme_distances = {}
    for theme_key, theme_data in THEMES.items():
        seeds = theme_data["seeds"]
        print(f"Running BFS for theme: {theme_data['label']} (seeds: {seeds})")
        theme_distances[theme_key] = multi_source_bfs(seeds, edges, all_concepts)
        
    # Classify files
    clusters = defaultdict(list)
    
    for concept, rel_path in concept_to_file.items():
        # Check if it is a journal log
        is_journal = JOURNAL_RE.match(rel_path) or 'journal/' in rel_path.lower()
        if is_journal:
            # Group journals by year to keep sizes manageable
            year_match = re.search(r'\b(202\d)\b', rel_path)
            year = year_match.group(1) if year_match else "other"
            theme_key = f"journal_{year}"
            clusters[theme_key].append(rel_path)
            continue
            
        # For conceptual files, find the closest theme
        best_theme = "standalone_conceptual"
        min_dist = float('inf')
        
        for theme_key in THEMES.keys():
            dist = theme_distances[theme_key][concept]
            if dist < min_dist:
                min_dist = dist
                best_theme = theme_key
                
        # If it is completely disconnected from all seeds, it goes to standalone
        if min_dist == float('inf'):
            best_theme = "standalone_conceptual"
            
        clusters[best_theme].append(rel_path)
        
    # Print statistics
    print("\n--- Clustering Summary ---")
    cluster_manifest = {}
    for key, files in sorted(clusters.items()):
        label = THEMES[key]["label"] if key in THEMES else key.replace("_", " ").title()
        print(f"- {label}: {len(files)} files")
        cluster_manifest[key] = {
            "label": label,
            "count": len(files),
            "files": sorted(files)
        }
        
    # Save manifest
    manifest_path = os.path.join(GEMINI_DIR, 'clusters_manifest.json')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(cluster_manifest, f, indent=2)
    print(f"\nManifest saved to {manifest_path}")

if __name__ == '__main__':
    main()
