# Speckit Methodology Rules

This project follows the **Speckit** workflow for AI-assisted development.

## Workflow Steps
1. **Constitution:** Define project principles (`CONSTITUTION.md`).
2. **Specify:** Define functional requirements (`SPEC.md`).
3. **Clarify:** Resolve ambiguities with the user.
4. **Plan:** Create a technical plan (`PLAN.md`).
5. **Review:** Review the plan for errors or complexity.
6. **Tasks:** Generate ordered tasks (`tasks.md`).
7. **Implement:** Execute tasks using `/speckit.implement` logic.

## Implementation Mandate
When executing `/speckit.implement`:
- Verify `CONSTITUTION.md`, `SPEC.md`, `PLAN.md`, and `tasks.md` exist.
- Read `tasks.md` and execute tasks in order.
- Generate code and run necessary commands (npm, capacitor, etc.).
- Maintain high-quality standards and native look & feel.
