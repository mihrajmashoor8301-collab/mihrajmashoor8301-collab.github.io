#!/usr/bin/env python3
"""
CALION Academy Curriculum Builder (v2)
Generates the authoritative 4-stage, 47-room TryHackMe-style cybersecurity curriculum.
Output: curriculum-data.js and learning-data.js
"""

import json
import os

STAGES = [
    {
        "id": "pre-security",
        "title": "Pre-Security",
        "order": 1,
        "tagline": "Foundational Computing, Networking & Command-Line",
        "description": "Essential foundational computing, networking architecture, Linux/Windows operating systems, and command-line mechanics required before offensive and defensive security.",
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

# We will create helper functions to generate realistic, detailed tasks and reviews
def make_room(rid, stage_id, stage_title, stage_order, room_num, title, desc, diff, time, xp, prereq, objs, skills, tools, tasks_data, next_rid):
    lessons = []
    total_q = 0
    all_qs = []
    
    for t_idx, t in enumerate(tasks_data):
        is_last = (t_idx == len(tasks_data) - 1)
        task_num = t_idx + 1
        
        q_objs = []
        for q in t.get("questions", []):
            total_q += 1
            q_objs.append(q)
            all_qs.append(q)
            
        task_entry = {
            "taskNumber": task_num,
            "title": f"Task {task_num}: {t['title']}" if not t['title'].startswith("Task") else t['title'],
            "concept": t["concept"],
            "whyItMatters": t["whyItMatters"],
            "examples": t.get("examples", []),
            "commands": t.get("commands", []),
            "guidedExercise": t.get("guidedExercise", ""),
            "isFinalReview": is_last,
            "reviewSummary": t.get("reviewSummary", None) if is_last else None,
            "questions": q_objs
        }
        lessons.append(task_entry)
        
    return {
        "id": rid,
        "stageId": stage_id,
        "stageTitle": stage_title,
        "stageOrder": stage_order,
        "stage": stage_order,
        "level": stage_order,
        "levelTitle": stage_title,
        "roomNumber": room_num,
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
        "questions": all_qs,
        "tasks": [{"title": l["title"], "instruction": l["guidedExercise"], "hints": [q["hint"] for q in l["questions"] if "hint" in q]} for l in lessons],
        "nextRoomId": next_rid
    }

print("Base definitions ready.")
