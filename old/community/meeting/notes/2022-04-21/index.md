# Podman Community Cabal Meeting Notes

Attendees: Tom Sweeney, Aditya Rajan, Matt Heon, Brent Baude, Ashley Cui, Chris Evich, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Walsh, Valentin Rothberg, Jhon Honce, Miloslav Trmač, Charlie Doern, Lokesh Mandvekar, Eduardo Santiago, Mohan Boddu, Chris Evich, Flavian Missi, Niall Crowe, Preethi Thomas, Anders Bjorklund, Lance Lovette, Scott McCarty

## April 21, 2022 Topics
1. Podman Contribution Methods Discussion - Brent Baude - (1:00 in video)

### Meeting Notes
Video [Recording](https://youtu.be/DP3FAGWn48s)

Meeting start 11:02 a.m. Thursday April 21, 2022

### Podman Contribution Methods Discussion - (1:00 in video) -  Brent Baude 

Brent talked about the number of hours that the maintainers have been grinding out lately.  He's concerned that the maintainers aren't keeping up with the Pull Requests that are coming in from internal to Red Hat and, more so, externally.

For instance, we have not been timely in reviewing Anders code as of late.  Brent is asking for input from people for any potential solutions.

Matt doesn't want to completely remove the Code Review process; he wants to ensure maintenance will be as painless as possible.  He thinks a core set of maintainers should review code before merging.   He thinks that perhaps we could use lint to help.  He recognizes there's a problem but wants to limit how easy it is to get stuff in.

We seem to have a cycle where maintainers lose sight of the need to stay on top of it until nudged.  The problem has become due to the expansion of the size and complexity of the project, making it harder to know everything easily.

Valentin thinks there are two goals.  Make merges easier and also to expand the number of maintainers.  In other projects, they leave more work to the contributors by using bots to bounce PRs if they don't have a pass a lint process per instance.

Valentin thinks that we're doing pretty good in comparison to other-sized projects.    Time is becoming an issue in some of our projects, such as [containers/image](https://github.com/containers/image) where PRs are lagging due to a lack of maintainers/review.

Miloslav has seen other projects assign particular reviewers to a review and doesn't know if that's something Podman could do.  Dan thinks we couldn't do that via a bot, but perhaps we could use a process as the Linux kernel does.

Chris pointed out that an advantage of the kernel is it's modular, and Podman is becoming monolithic.  Perhaps we can break it out into pieces.  That would also be useful in developing unit tests.

Matt has asked others to help with the Triage of issues, and since then, he has found that Valentin and Paul have kept that down quickly.

Valentin wonders if we're not getting to issues promptly or, for that matter, PRs.

Matt thinks we're falling off the radar for issues.  If an issue will take a long time to fix, it gets shuffled off.  Ditto PRs that are 500 lines or more. People have a hard time getting to it, then it slips off the queue.

Mohan wonders if we can ask contributors to add tags to help with initial triaging.

We have two classes of issues with PR.  Some are done by developers, and others are a fix for a quick typo and then get hung up on CI. They tend not to undertake it.

Anders said in another [project](https://minikube.sigs.k8s.io/community/) they have weekly triage meetings where they use a [tool](https://github.com/google/triage-party ) to classify issues.  But there too, after being classified, it doesn't seem to help get it solved faster.

Study - 26
Brent showed an [article](https://linearb.io/blog/the-pull-request-paradox-merge-faster-by-promoting-your-pr/) on Pull requests.  It showed that 50% of PRs were idle for 50% of their lifetime, and 33% were idle for 78% of their lifetime.  The issue gets compounded when a rebase is necessary.

Valentin points out that code review is as much of an art as writing code.  Perhaps we can get faster reviewing things.

Flavian has asked what the problems are that we face when getting through the backlog.

Brent thinks the team could work on more feature work.   Also, to spend more time on PRs for issues, but we're falling behind.  When we have a new feature such as podman machine, a few people attend to that, and they stay away from other PRs.

A number of PRs which are perfectly good to go, but they don't get reviewed due to time, and the contributors are less than happy with that.

Brent also thinks we often create PRs that grow larger and larger rather than be done in building blocks.

Dan thinks we've two problems.  Handling issues.  We address that by having a bug week when we get above 200 in number on GitHub.  Even with the whole team on board, we're lucky to get it down into the 180 mark.  A bit of a treadmill.

The other side is when someone opens a PR, then people looking at issues often don't break off to look at the PRs that have come in.

Chris noted that 45 minutes is the sweet spot for the CI completion to wrap up in.  A recent review by a group of college students noted the heaviness of the CI process for contributors as being a bad mark.  FOr instance, if you have a misplaced semi-colon, it can take hours to get notified.  Unit tests run faster than integration tests, and system tests are faster than them.  It would be good if the CI could focus on unit tests and then continue to integration tests only if the unit tests are happy.  Ditto system tests.

Jhon pointed out that once we spin-off to a cloud system for CI, you're really not doing a unit test per se.  He also briefly talked about mock tests, and Miloslav noted that they're not always the [answer](https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell).

Chris thinks the CI we have will take a lot of effort to make faster without a lot of retooling other stuff.  

Anders asked if we run on VMs or containers, and we run on VMs, not really eating our own dog food.  He thinks it would be more interesting to run at least some unit tests in containers.

Valentin noted that code coverage only handles unit tests.  He thinks it would be great to have CI revamped, but we'll need more meetings to do so.

Urvashi thinks we need to come to a consensus on "How to code review.".

Brent doesn't like to have code design debates within the PR and would like to see more peer-to-peer reviews and/or mentoring reviews.

Brent asked that everyone read the article he put together and would like people to come back and think about potential changes.  Essentially, he just wants to have everyone on board in thinking there's a problem.

Articles:
https://linearb.io/blog/the-pull-request-paradox-merge-faster-by-promoting-your-pr/
https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell
https://www.pullrequest.com/blog/why-your-team-isnt-reviewing-pull-requests/
https://www.morling.dev/blog/the-code-review-pyramid/

#### Open discussion (53:37 in video)
1.  Brent has created a 4.0.3 FCOS image in hand that he'd like people to try on the mac.
2.  Podman 4.1 RC should be released later today.

### Next Meeting: Thursday May 16, 2022 11:00 a.m. EDT (UTC-5)
### Next Community Meeting: Tuesday June 7, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. None

Meeting finished 11:58 a.m.

Raw Meeting Chat:

```
You11:00 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You11:01 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You11:05 AM
Urvashi, can you send me a link to the doc in email plz?
Preethi Thomas11:05 AM
Tom its both in the email and in gchat
Urvashi Mohnani11:06 AM
yup, sent it to aos-internal and its in our gchat room as well
You11:27 AM
TY! UM
Flavian Missi11:27 AM
maybe https://github.com/google/triage-party ?
Urvashi Mohnani11:28 AM
https://linearb.io/blog/the-pull-request-paradox-merge-faster-by-promoting-your-pr/
link to the article ^^
Anders F Björklund11:29 AM
Right, that is the tool
https://minikube.sigs.k8s.io/community/
You11:32 AM
Anders and Flavian, thx for the links, I've added them to the notes.
Miloslav Trmac11:42 AM
/me is on the anti-mocking side:
https://www.destroyallsoftware.com/screencasts/catalog/functional-core-imperative-shell
(CRI-O has mocks of c/storage and Podman and IMHO it’s a _nightmare_, e.g. in some cases not testing the right code at all.)
Miloslav Trmac11:46 AM
Are there some easy wins like making the current “must include tests” bot nudge users towards unit tests and discourage adding another shell script to system tests?
Preethi Thomas11:47 AM
https://www.pullrequest.com/blog/why-your-team-isnt-reviewing-pull-requests/
Brent Baude11:48 AM
one thing our development tooling/environment needs is the ability to run the e2e tests locally but isolated ... hint: make locale2e-vagrant ...
Matt Heon11:48 AM
I think the no-new-tests-needed check might actually fail a PR if it only had unit tests
It checks the tests/ folder AFAIK
Unit tests don't live in there
Paul Holzinger11:48 AM
@Matt no it also checks for _test.go
Valentin Rothberg11:50 AM
Here's a link to the reviewing pyramid -> https://www.morling.dev/blog/the-code-review-pyramid/
ieq-pxhy-jbh
```
