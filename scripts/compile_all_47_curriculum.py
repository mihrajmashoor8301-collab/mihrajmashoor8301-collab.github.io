#!/usr/bin/env python3
"""
Master Compiler for CALION Academy 4-Stage 47-Room Curriculum
Combines Stage 1 (10 rooms), Stage 2 (10 rooms), Stage 3 (12 rooms), Stage 4 (15 rooms).
Outputs:
- learning-data.js
- curriculum-data.js
- supabase/migrations/202611180001_calion_academy_47_rooms_seed.sql
"""

import json
import os
import sys

# Import catalogs
from catalog_stage1 import CATALOG as STAGE1_ROOMS
from catalog_stage2 import STAGE2_ROOMS
from catalog_stage3 import STAGE3_ROOMS
from catalog_stage4 import STAGE4_ROOMS

STAGES = [
    {
        "id": "pre-security",
        "title": "Pre-Security",
        "order": 1,
        "tagline": "Foundational Computing, Networking & Command-Line",
        "description": "Essential computing architecture, network protocols, Linux/Windows operating systems, and command-line mechanics required before offensive and defensive security.",
        "icon": "shield",
        "color": "#0284c7",
        "roomCount": 10,
        "estimatedTime": "5 hr 30 min",
        "difficulty": "Beginner",
        "unlockedByDefault": True,
        "prerequisiteStageId": None
    },
    {
        "id": "cyber-security",
        "title": "Cyber Security Foundations",
        "order": 2,
        "tagline": "Core Security Principles, Threat Modeling & Defense",
        "description": "Master the core principles of cybersecurity: the CIA Triad, threat modeling, authentication architectures, applied cryptography, malware classification, and incident response frameworks.",
        "icon": "lock",
        "color": "#6366f1",
        "roomCount": 10,
        "estimatedTime": "6 hr 15 min",
        "difficulty": "Foundational",
        "unlockedByDefault": False,
        "prerequisiteStageId": "pre-security"
    },
    {
        "id": "defensive-security",
        "title": "Defensive Security",
        "order": 3,
        "tagline": "Blue Team Operations, SOC Analysis & Threat Hunting",
        "description": "Specialized defensive security training: SOC operations, Windows/Linux log analysis, Wireshark traffic inspection, SIEM detection engineering, digital forensics, and incident containment.",
        "icon": "security",
        "color": "#10b981",
        "roomCount": 12,
        "estimatedTime": "8 hr 45 min",
        "difficulty": "Intermediate",
        "unlockedByDefault": False,
        "prerequisiteStageId": "cyber-security"
    },
    {
        "id": "offensive-security",
        "title": "Offensive Security",
        "order": 4,
        "tagline": "Authorized Security Testing, Exploitation & Remediation",
        "description": "Specialized offensive security training: Rules of engagement, network reconnaissance, service enumeration, OWASP Top 10 web exploitation, privilege escalation, and executive remediation reporting.",
        "icon": "swords",
        "color": "#ef4444",
        "roomCount": 15,
        "estimatedTime": "11 hr 20 min",
        "difficulty": "Advanced",
        "unlockedByDefault": False,
        "prerequisiteStageId": "cyber-security"
    }
]

def format_room(item):
    num, rid, sid, stitle, sorder, title, desc, diff, time, xp, prereq, objs, skills, tools, next_rid, tasks_raw, final_summary = item
    
    lessons = []
    all_questions = []
    
    for t_idx, t in enumerate(tasks_raw):
        t_num = t_idx + 1
        is_final = (t_idx == len(tasks_raw) - 1)
        
        t_title = t[0]
        t_concept = t[1]
        t_why = t[2] if len(t) > 2 else "Understanding this concept is fundamental for practical cybersecurity operations."
        t_examples = t[3] if len(t) > 3 else []
        t_commands = t[4] if len(t) > 4 else []
        t_exercise = t[5] if len(t) > 5 else "Review and complete the guided exercise in the interactive sandbox."
        t_questions = t[6] if len(t) > 6 else []

        if not t_questions:
            q_id = f"q-{rid[5:]}-{t_num}"
            if is_final:
                t_questions = [{
                    "id": q_id,
                    "type": "multiple-choice",
                    "question": f"Which key technical concept best summarizes your learning in {title}?",
                    "options": [
                        objs[0] if objs else "Core cybersecurity principles and practical application",
                        "Ignoring operating system permissions and error logs",
                        "Executing unauthorized attacks against production networks without scope",
                        "Using plaintext passwords on unencrypted networks"
                    ],
                    "correctIndex": 0,
                    "hint": "Reflect on the primary learning objective of this room.",
                    "explanation": f"Understanding {objs[0] if objs else 'the core concept'} is the central takeaway of this room."
                }]
            else:
                t_questions = [{
                    "id": q_id,
                    "type": "multiple-choice",
                    "question": f"Why is {t_title} important in practical security?",
                    "options": [
                        t_why if t_why else "It provides essential baseline security and operational context.",
                        "It is completely unnecessary in modern environments",
                        "It only applies to legacy computers from the 1980s",
                        "It intentionally disables security protections"
                    ],
                    "correctIndex": 0,
                    "hint": "Consider the operational context and defensive value.",
                    "explanation": t_why if t_why else "Understanding this topic ensures sound security decisions."
                }]
        
        for q in t_questions:
            all_questions.append(q)
            
        task_dict = {
            "taskNumber": t_num,
            "title": f"Task {t_num}: {t_title}" if not t_title.startswith("Task") else t_title,
            "concept": t_concept,
            "whyItMatters": t_why,
            "examples": t_examples,
            "commands": t_commands,
            "guidedExercise": t_exercise,
            "isFinalReview": is_final,
            "reviewSummary": final_summary if is_final else None,
            "questions": t_questions
        }
        lessons.append(task_dict)
        
    tasks_meta = []
    for l in lessons:
        hints = [q["hint"] for q in l["questions"] if "hint" in q]
        tasks_meta.append({
            "title": l["title"],
            "instruction": l["guidedExercise"],
            "hints": hints
        })
        
    return {
        "id": rid,
        "stageId": sid,
        "stageTitle": stitle,
        "stageOrder": sorder,
        "stage": sorder,
        "level": sorder,
        "levelTitle": stitle,
        "roomNumber": num,
        "title": title,
        "description": desc,
        "difficulty": diff,
        "difficultyBadge": diff,
        "estimatedTime": time,
        "xpReward": xp,
        "prerequisites": prereq,
        "whyAreYouHere": desc,
        "objectives": objs,
        "skillsGained": skills,
        "toolsAndCommands": tools,
        "lessons": lessons,
        "questions": all_questions,
        "tasks": tasks_meta,
        "nextRoomId": next_rid
    }

ALL_RAW = STAGE1_ROOMS + STAGE2_ROOMS + STAGE3_ROOMS + STAGE4_ROOMS
COMPILED_ROOMS = [format_room(r) for r in ALL_RAW]

print(f"Total compiled rooms: {len(COMPILED_ROOMS)}")

# Verify sequential numbering and IDs
assert len(COMPILED_ROOMS) == 47, f"Expected 47 rooms, got {len(COMPILED_ROOMS)}"
for idx, r in enumerate(COMPILED_ROOMS):
    expected_id = f"room-{idx+1:02d}"
    assert r["id"] == expected_id, f"Room index {idx} has ID {r['id']}, expected {expected_id}"
    assert len(r["lessons"]) >= 3, f"Room {r['id']} has fewer than 3 tasks"
    assert r["lessons"][-1]["isFinalReview"] == True, f"Room {r['id']} last task is not marked as final review"
    assert r["lessons"][-1]["reviewSummary"] is not None, f"Room {r['id']} missing reviewSummary in Task N"

print("All integrity assertions passed!")

# Build PRE_SECURITY_LEVELS shim for backwards compatibility with tests and legacy views
LEGACY_LEVELS = []
for s in STAGES:
    LEGACY_LEVELS.append({
        "id": s["order"] - 1,
        "number": f"0{s['order']}",
        "title": s["title"],
        "tagline": s["tagline"],
        "description": s["description"],
        "color": s["color"],
        "icon": s["icon"],
        "roomCount": s["roomCount"],
        "estimatedTime": s["estimatedTime"],
        "difficulty": s["difficulty"]
    })

# Output file content
js_content = f"""/**
 * CALION Cybersecurity Academy — Authoritative Curriculum Database (v2)
 * Complete 4-Stage, 47-Room Cybersecurity Progression Tree
 * 
 * Single source of truth for:
 * Stage 1: Pre-Security (10 Rooms)
 * Stage 2: Cyber Security Foundations (10 Rooms)
 * Stage 3: Defensive Security (12 Rooms)
 * Stage 4: Offensive Security (15 Rooms)
 * Total: 47 Comprehensive Rooms
 */

const CALION_STAGES = {json.dumps(STAGES, indent=2)};

const CALION_ROOMS = {json.dumps(COMPILED_ROOMS, indent=2)};

// Backward compatibility references for legacy test runners and existing state engines
const PRE_SECURITY_ROOMS = CALION_ROOMS;
const PRE_SECURITY_LEVELS = {json.dumps(LEGACY_LEVELS, indent=2)};

if (typeof module !== 'undefined' && module.exports) {{
  module.exports = {{
    CALION_STAGES,
    CALION_ROOMS,
    PRE_SECURITY_ROOMS,
    PRE_SECURITY_LEVELS
  }};
}}
"""

# Write to root learning-data.js and curriculum-data.js
with open("learning-data.js", "w", encoding="utf-8") as f:
    f.write(js_content)
print("Updated learning-data.js")

with open("curriculum-data.js", "w", encoding="utf-8") as f:
    f.write(js_content)
print("Updated curriculum-data.js")

# Generate SQL Seed Migration for Supabase
sql_lines = [
    "-- CALION Academy — 4-Stage, 47-Room Authoritative Curriculum Seed (v2)",
    "-- Automatically generated by scripts/compile_all_47_curriculum.py",
    "",
    "-- 1. Seed the 4 Stages as Learning Paths",
    "insert into public.learning_paths (id, title, description, badge_icon, display_order) values",
]

path_values = []
for s in STAGES:
    s_desc = s['description'].replace("'", "''")
    path_values.append(f"  ('{s['id']}', '{s['title']}', '{s_desc}', '{s['icon']}', {s['order']})")

sql_lines.append(",\n".join(path_values))
sql_lines.append("on conflict (id) do update set title = excluded.title, description = excluded.description, display_order = excluded.display_order;")
sql_lines.append("")

sql_lines.append("-- 2. Seed all 47 Rooms")
sql_lines.append("insert into public.rooms (id, path_id, level_number, title, description, xp_reward, total_questions, display_order) values")

room_values = []
for r in COMPILED_ROOMS:
    r_title = r["title"].replace("'", "''")
    r_desc = r["description"].replace("'", "''")
    q_count = len(r["questions"])
    room_values.append(f"  ('{r['id']}', '{r['stageId']}', {r['stageOrder']}, '{r_title}', '{r_desc}', {r['xpReward']}, {q_count}, {r['roomNumber']})")

sql_lines.append(",\n".join(room_values))
sql_lines.append("on conflict (id) do update set path_id = excluded.path_id, level_number = excluded.level_number, title = excluded.title, description = excluded.description, total_questions = excluded.total_questions, display_order = excluded.display_order;")
sql_lines.append("")

with open("supabase/migrations/202611180001_calion_academy_47_rooms_seed.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print("Generated supabase/migrations/202611180001_calion_academy_47_rooms_seed.sql")
