export const extractSkills = (jdText) => {
    if (!jdText) jdText = "";
    const categories = {
        "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
        "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
        "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
        "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
        "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
        "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
    };

    const extracted = {};
    let categoryCount = 0;

    const textLower = jdText.toLowerCase();

    for (const [category, skills] of Object.entries(categories)) {
        const found = skills.filter(skill => {
            if (["C", "Go", "OS"].includes(skill)) {
                const regex = new RegExp(`\\b${skill.toLowerCase()}\\b`);
                return regex.test(textLower);
            } else if (skill === "C++") {
                return textLower.includes("c++");
            } else if (skill === "C#") {
                return textLower.includes("c#");
            } else {
                return textLower.includes(skill.toLowerCase());
            }
        });

        if (found.length > 0) {
            extracted[category] = found;
            categoryCount++;
        }
    }

    const hasNone = Object.keys(extracted).length === 0;
    if (hasNone) {
        extracted["General"] = ["General fresher stack"];
    }

    return { extracted, categoryCount, hasNone };
};

export const generatePlan = (extractedSkills) => {
    const hasWeb = extractedSkills["Web"] !== undefined;
    const hasData = extractedSkills["Data"] !== undefined;
    const hasCloud = extractedSkills["Cloud/DevOps"] !== undefined;
    const hasTesting = extractedSkills["Testing"] !== undefined;

    return [
        { day: "Day 1–2", title: "Basics + core CS", description: "Revise fundamentals: OOP, OS, DBMS, Networks. Focus on standard questions." },
        { day: "Day 3–4", title: "DSA + coding practice", description: "Solve medium difficulty problems on arrays, strings, trees, and graphs." },
        { day: "Day 5", title: "Project + resume alignment", description: hasWeb ? "Review your Web Development projects and frontend/backend integration." : "Deep dive into the architecture and challenges of your resume projects." },
        { day: "Day 6", title: "Mock interview questions", description: hasData ? "Practice SQL queries and database design interviews." : "Practice behavioral and standard technical questions." },
        { day: "Day 7", title: "Revision + weak areas", description: (hasCloud || hasTesting) ? "Review deployment pipelines, testing frameworks, and cloud concepts." : "Final run-through of core concepts and weak areas." }
    ];
};

export const generateChecklist = (extractedSkills) => {
    const hasWeb = extractedSkills["Web"] && extractedSkills["Web"].length > 0;
    const hasData = extractedSkills["Data"] && extractedSkills["Data"].length > 0;
    const hasTesting = extractedSkills["Testing"] && extractedSkills["Testing"].length > 0;

    return [
        {
            round: "Round 1: Aptitude / Basics",
            items: [
                "Quantitative Aptitude",
                "Logical Reasoning",
                "Verbal Ability",
                "Speed Math",
                "Basic Programming Constructs",
                hasData ? "Basic SQL Queries" : null
            ].filter(Boolean)
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Arrays & Strings",
                "Linked Lists & Trees",
                "Sorting Algorithms",
                "DBMS Normalization",
                "OS concepts: Threads vs Processes",
                "OOP Principles (Inheritance, Polymorphism)"
            ]
        },
        {
            round: "Round 3: Tech interview (projects + stack)",
            items: [
                "Explain project architecture",
                "Discuss challenging bug fixes",
                "Why did you choose this tech stack?",
                hasWeb ? "Web architecture & lifecycle hooks" : null,
                hasData ? "Database scaling and indexing" : "Memory management",
                hasTesting ? "Unit, Integration, and E2E Testing Strategies" : "API design details"
            ].filter(Boolean)
        },
        {
            round: "Round 4: Managerial / HR",
            items: [
                "Tell me about yourself",
                "Why should we hire you?",
                "Where do you see yourself in 5 years?",
                "Strengths and Weaknesses",
                "Experience working in a team",
                "Handling conflicts and deadlines"
            ]
        }
    ];
};

export const generateQuestions = (extractedSkills) => {
    const allSkills = Object.values(extractedSkills).flat().map(s => s.toLowerCase());

    const questionBank = {
        "sql": "Explain indexing in SQL databases and when it helps to improve performance.",
        "react": "Explain state management options in React and when to use Context vs Redux.",
        "dsa": "How would you optimize search in a large sorted dataset?",
        "java": "Explain the difference between HashMap and ConcurrentHashMap in Java.",
        "python": "How does Python handle memory management and garbage collection?",
        "javascript": "Explain Event Loop, Promises, and Async/Await in JavaScript.",
        "node.js": "How does Node.js handle concurrency despite being single-threaded?",
        "mongodb": "What are the advantages of NoSQL over relational databases?",
        "aws": "Explain the difference between EC2 and S3, and when to use each.",
        "docker": "What is the difference between a virtual machine and a Docker container?",
        "kubernetes": "Explain the concept of Pods and Services in Kubernetes.",
        "ci/cd": "Describe a standard CI/CD pipeline and the tools you would use.",
        "oop": "Explain the four main pillars of Object-Oriented Programming with real-world examples.",
        "os": "What is a deadlock and what are the necessary conditions for it to occur?",
        "networks": "Explain what happens when you type an URL into your browser until the page renders.",
        "dbms": "What are ACID properties in the context of database transactions?"
    };

    const questions = [];
    for (const skill of allSkills) {
        if (questionBank[skill] && !questions.includes(questionBank[skill])) {
            questions.push(questionBank[skill]);
        }
    }

    const generalQuestions = [
        "Can you walk me through your most complex project?",
        "How do you handle disagreements with a team member?",
        "Describe a time you had to learn a new technology quickly.",
        "What is your approach to writing unit tests?",
        "How do you stay updated with the latest technology trends?",
        "Explain a time when you missed a deadline and how you handled it.",
        "What are the most important principles of clean code?",
        "How would you approach designing a scalable system from scratch?",
        "Describe your debugging process when faced with a critical production issue.",
        "Why do you want to work for our company?"
    ];

    while (questions.length < 10 && generalQuestions.length > 0) {
        questions.push(generalQuestions.shift());
    }

    return questions.slice(0, 10);
};

export const processJD = (company, role, jdText) => {
    const { extracted, categoryCount, hasNone } = extractSkills(jdText);

    let score = 35;
    score += Math.min(categoryCount * 5, 30);
    if (company && company.trim().length > 0) score += 10;
    if (role && role.trim().length > 0) score += 10;
    if (jdText && jdText.trim().length > 800) score += 10;
    score = Math.min(score, 100);

    return {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company: company || "Unknown Company",
        role: role || "Unknown Role",
        jdText,
        extractedSkills: extracted,
        readinessScore: score,
        checklist: generateChecklist(extracted),
        plan: generatePlan(extracted),
        questions: generateQuestions(extracted)
    };
};
