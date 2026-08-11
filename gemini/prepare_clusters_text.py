#!/usr/bin/env python3
import os
import json

GARDEN_DIR = '/home/flancian/garden'
GEMINI_DIR = os.path.join(GARDEN_DIR, 'gemini')
MANIFEST_PATH = os.path.join(GEMINI_DIR, 'clusters_manifest.json')

# Max size of a single consolidated file in bytes (approx 400 KB)
MAX_FILE_SIZE = 400 * 1024 

def consolidate_files(cluster_key, files, label):
    print(f"Consolidating {cluster_key} ({len(files)} files)...")
    
    part_idx = 1
    current_size = 0
    current_lines = []
    
    def write_part():
        nonlocal part_idx, current_size, current_lines
        if not current_lines:
            return
            
        filename = f"consolidated_{cluster_key}_part{part_idx}.txt" if part_idx > 1 or len(files) > 1000 else f"consolidated_{cluster_key}.txt"
        out_path = os.path.join(GEMINI_DIR, filename)
        
        with open(out_path, 'w', encoding='utf-8') as f:
            f.writelines(current_lines)
            
        print(f"  Wrote {filename} ({current_size / 1024:.1f} KB)")
        current_lines = []
        current_size = 0
        part_idx += 1

    for rel_path in files:
        full_path = os.path.join(GARDEN_DIR, rel_path)
        if not os.path.exists(full_path):
            continue
            
        try:
            with open(full_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            header = f"\n\n========================================\nFILE: {rel_path}\n========================================\n\n"
            file_text = header + content + "\n"
            file_bytes = file_text.encode('utf-8')
            
            # If adding this file exceeds the max size, write the current part first
            if current_size + len(file_bytes) > MAX_FILE_SIZE and current_size > 0:
                write_part()
                
            current_lines.append(file_text)
            current_size += len(file_bytes)
            
        except Exception as e:
            print(f"  Error reading {rel_path}: {e}")
            
    # Write the remaining content
    write_part()

def main():
    if not os.path.exists(MANIFEST_PATH):
        print(f"Error: Manifest not found at {MANIFEST_PATH}")
        return
        
    with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
        
    for cluster_key, data in manifest.items():
        files = data["files"]
        label = data["label"]
        consolidate_files(cluster_key, files, label)
        
    print("\nAll clusters consolidated successfully.")

if __name__ == '__main__':
    main()
