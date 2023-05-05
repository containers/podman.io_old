# Podman Community Cabal Meeting Notes

Attendees: Matt Heon, Dan Walsh, Nalin Dahyabhai, Paul Holzinger, Lokesh Mandvekar, Valentin Rothberg, Eduardo Santiago, Giuseppe Scrivano, Aditya Rajan, Preethi Thomas, Ashley Cui, Stevan Le Meur, Jeremy Buseman, Aakanksha Duggal, Brent Baude, Christopher Evich, Leon N, Thomas Gonzales, Urvashi Mohnani, Lance Lovette, Martin Jackson

## January 19, 2023 Topics

1. Podman v4.4 Update - Matt Heon

2. Autoclosing issues - Ed Santiago
	A. https://issues.redhat.com/browse/RUN-1721

3. Time-to-merge-tool using AI - Aakanksha Duggal
	A. [website](https://github.com/redhat-et/time-to-merge-tool)
	B. contact : aduggal@redhat.com


### Meeting Notes
Video [Recording](https://youtu.be/YCi6KuC9ESw)

Meeting start 11:02 a.m. Thursday, January 19, 2023

###  Podman v4.4 Update - (0:50 in the video) - Matt Heon

No release notes yet, working on them for the next RC.  Podman v4.4 RC2 out recently, RC3 soon with release notes.  Final a week or so later.   It will include Quadlet support.

###  Autoclosing issues in GitHub - (2:54 in the video) - Ed Santiago

Ed doesn't think we should be autoclosing issues with any of the tools.  Ed proposes a possible jetsam tag which would be used to mark a potential issue to close. Issue noted [here](https://issues.redhat.com/browse/RUN-1721) - "podman: spike create EOL policies for issues and PRs".  Valentin concurs.

If Dan sees an issue go stale after 30 days without any activity, he removes them.  The ones that are getting removed are generally lower priority that the community hasn't picked up.

Ed is thinking about making a table to note inactive issues and wonders if it would be of help.

Dan thinks the table is good for features so that we can review those with a person before it gets closed.

Valentin thinks that, in general, humans should make the decision to close an issue, not a bot.

Not a lot of support for autoclosing, so Ed is abandoning the idea.

Paul and Brent would like to lock closed PRs or Issues after 30 days.

Chris said GitHub actions might be useable to resort issues into categories like look at this now.  For instance this [bot](https://gist.github.com/rh-container-bot/f505b6fb78db279855862e035629f8aa#file-images-md)

Paul is concerned about older versions of Podman that issues are getting reported against and the time necessary to do fix them.

Valentin wants to be careful with these and not just dismiss them as they might also be upstream.


###  Time-to-merge-tool using AI - (26:12 in the video) - Aakanksha Duggal 

[Slides](./Time_To_Merge_Tool.pdf)
[Project on GitHub](https://github.com/redhat-et/time-to-merge-tool)

AI4CI - Open Source AIOps toolkit

Lack of metrics for Open Source data.

The AI4CI supports CI/CD and software dev process
  * Data Collection
  * Metrics
  * ML Services
  * Open source AIOps template

The tool measures the time to merge a PR into the GitHub Project.  Can be used to id bottlenectks.  Historical data of issues, commits and PRs.

It gives new contributors an estimate of how long a PR will take to go through the process..

It Collects Data - Features - Model Building - Training Actions - Make predictions.

Gives project features.

Models service is done by GitHub actions.

The Workflow can be started two ways in training and inference mode.

It trains for each individual repository.  Used currently by openshift, ansible, and others.

It requires an action.yaml file and a few other files.

Demo - (36:24 in the video)

Aakanksh showed her repo and walked through the files that need to be put into place within the GitHub workflows.

Once setup, you can go to "Actions" and click on the training.

There is also an [autoclose](https://github.com/AICoE/elyra-aidevsecops-tutorial/issues/532#issuecomment-1347919300)

#### Open discussion (52:42 in the video)

1.  Podman v4.4 RC2 errors
	Martin Jackson noted an issue with CNI errors on Podman 4.4 RC2.  [Issues](https://bodhi.fedoraproject.org/updates/FEDORA-2023-a0f754c701)


    
### Next Meeting: Thursday, February 16, 2023, 11:00 a.m. EDT (UTC-5)
## Possible Topics
1. None discussed.

### Next Community Meeting: Tuesday, February 7, 2023 11:00 a.m. EDT (UTC-5)

### Possible Topics:


Meeting finished 11:59 a.m.

Raw Meeting Chat:

```
You11:00 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Lokesh Mandvekar11:04 AM
v4.4.0-rc2 will be available in updates-testing soon https://bodhi.fedoraproject.org/updates/?packages=podman
You11:05 AM
https://issues.redhat.com/browse/RUN-1721
Miloslav Trmac11:10 AM
I think it’s fair to close stale issues on which we can take no action - bugs with information required to debug not provided, PRs (for features we don’t otherwise care about) where the submitter has gone away.
For things that were determined to be real bugs or real features we might want, we just don’t have capacity for, I can’t see any benefit to closing them that couldn’t just as well be obtained by sorting by recent updates, and ignoring the older ones.
Christopher Evich11:22 AM
e.g. https://gist.github.com/rh-container-bot/f505b6fb78db279855862e035629f8aa#file-images-md
Christopher Evich11:25 AM
markdown-table posted by 'exuanbo/actions-deploy-gist' github-action.
Miloslav Trmac11:26 AM
If we are overworked, one option is to just do less; another is to farm out some of the effort to other people. In that sense, asking reporters to reproduce on mainline might be a good tradeoff? OTOH it could very well cost us important bugs that would not reach us.
Brent Baude11:27 AM
Paul is tugging on a good thread here ... can we get a separate cabal to talk about ubuntu?
You11:29 AM
Aakanksha's project: https://github.com/redhat-et/time-to-merge-tool
You11:35 AM
I suspect Preethi is enthralled....
You11:42 AM
Can you ignore a particular user's PRs?  I'm thinking dependabot/bot users who would potentially mess up the curve for most "real" people.
You11:51 AM
Aakanksha, can you ping me by email so I can have you email address please?
Aakanksha Duggal11:52 AM
https://github.com/AICoE/elyra-aidevsecops-tutorial/issues/532#issuecomment-1347919300
Miloslav Trmac11:54 AM
Is the ML model interpretable, i.e. can it give us insight into causes / correlations?
Aakanksha Duggal11:54 AM
@miloslav - not yet, but something we plan to look into.
Preethi Thomas11:55 AM
Thanks Aakansha for presenting
Lokesh Mandvekar11:56 AM
https://bodhi.fedoraproject.org/updates/FEDORA-2023-a0f754c701
Christopher Evich11:57 AM
Ya, thanks Aakansha, it's a really neat way to use AI/ML.
Aakanksha Duggal11:57 AM
Thank you for having me. Please feel free to contact me if needed. :)
ieq-pxhy-jbh
```
