# SRE for Society

- [[pull]] [[sre]] [[society]] [[community]]
- [[push]] [[agora]]

A proposal to map the principles of [[Site Reliability Engineering]] (SRE) to the design and maintenance of resilient human communities and social systems.

## The Premise

If we view a [[community]] as a distributed system, we can apply the rigorous engineering practices used to keep high-availability systems (like [[Google]]) running to keep our social groups healthy. The goal is not to treat people like machines, but to build *systems* that are resilient to human error and conflict.

## Mappings

### SLOs -> [[Social Contracts]]
In SRE, a **Service Level Objective (SLO)** defines the acceptable level of reliability (e.g., "99.9% of requests will succeed").
In a community, this maps to a **[[Social Contract]]**.
*   **Question:** What is the acceptable level of "friction" or misunderstanding we tolerate before declaring the community "broken"?
*   **Application:** Explicitly defining expectations. We don't expect 100% harmony (which is impossible/stifling), but we define a threshold for acceptable discourse.

### Error Budgets -> [[Forgiveness Budgets]]
In SRE, an **Error Budget** is the allowed amount of downtime. If you have budget left, you can take risks and push code. If you burn it all, you must freeze changes.
In a community, this maps to a **[[Forgiveness Budget]]**.
*   **Question:** How much can a member "mess up" before they are banned?
*   **Application:** We need room to fail. If we demand perfection (0% error rate), we stifle innovation and authenticity. "Cancellation" happens when a community has zero error budget. We should track "social downtime" and use it to calibrate our tolerance.

### Incident Management -> [[Conflict Resolution]]
In SRE, when a system breaks, we declare an **Incident**. We assign an **Incident Commander** (IC). We follow a **Runbook**.
In a community, this maps to **[[Conflict Resolution]]** protocols.
*   **Question:** When a "flame war" breaks out, who is the IC? What is the runbook?
*   **Application:** Instead of ad-hoc piling on, we have a defined process. "This thread is overheating. [[User X]] is now the designated facilitator. We are entering 'Cool Down' mode as per Runbook A."

### Post-Mortems -> [[Restorative Justice Circles]]
In SRE, after an incident, we hold a **Blameless Post-Mortem**. The goal is not to fire the engineer who pushed the bug, but to understand *why* the system allowed the bug to be pushed.
In a community, this maps to **[[Restorative Justice Circles]]**.
*   **Question:** How do we learn from social failure without scapegoating?
*   **Application:** "We had a bad argument. Let's not just ban the agitator. Let's look at the systemic triggers. Did our UI encourage hostility? Was the context unclear?" Focus on *healing* the system and the relationships.

## See Also
- [[Reliability Engineering for Communities]]
- [[Community SRE]]
- [[Psychological Safety]]
