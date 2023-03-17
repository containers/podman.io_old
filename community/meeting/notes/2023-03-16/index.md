# Podman Community Cabal Meeting Notes

Attendees: Matt Heon, Nalin Dahyabhai, Paul Holzinger, Lokesh Mandvekar, Valentin Rothberg, Eduardo Santiago, Giuseppe Scrivano, Preethi Thomas, Ashley Cui, Brent Baude, Chris Evich, Urvashi Mohnani, Martin Jackson, Mohan Boddu, Lance Lovette, and Sumantro Mukherjee

## March 16, 2023 Topics

1. Podman and SQLite - Matt Heon
2. Hack/Perf scripts - Valentin Rothberg
3. Container Tools (podman) test day - Mohan/Lokesh/Sumantro
    
### Meeting Notes
Video [Recording](https://youtu.be/k_88s2RQm5Q)

Meeting start 11:03 a.m. EDT Thursday, March 16, 2023

###  Podman and SQLite (0:45 in the video) - Matt Heon

BoltDB is used currently as the database engine for Podman.  We have encountered issues with BoltDB and discovered that BoltDB, for all intents and purposes, is no longer supported.  The database can be corrupted after a power outage if the timing is badly "right".

Matt has looked into SQLite and has worked up replacement routines.   By default, starting in August, new Podman installs will get SQLite.  Later, the BoltDB databases may be converted, method TBD.

So far, a slight performance increase with SQLite, a 30 to 40-millisecond speed up with container commands.

Nothing for the user to do, except maybe initialize a database conversion routine.

This should be out in Podman v4.5.

Currently, the plan is to have `podman system reset` clear the database, and scripts are being looked into also, but no promises.  Matt thinks he'll keep BoltDB around for at least a year.

###  Hack/Perf Scripts (7:07 in the video) - Valentin Rothberg

Showed a configurable script that drives the test.  It uses [Hyperfine](https://github.com/sharkdp/hyperfine).  It shows the output of a variety of Docker and Podman commands.

The script consists of a "prepare" command to set things up in advance, but it does not have a post-test run process capability.

The scripts are under [hack/perf](https://github.com/containers/podman/tree/main/hack/perf) on GitHub; contributions are gratefully accepted.

Brent asked if you could run just one engine?  No, these scripts are written in mind to compare two engines.  But the scripts could be modified; or new ones created to work with just one engine.

For cleanup, Valentin put procedures in the startup scripts.

Dan thinks it would be nice to have a run.sh to feed commands into the test to check on those particular commands.  Valentin likes the idea, but for cleaning/setting stuff up as you should do for a perf test, Valentin found the scripts to be easier to handle.

Dan would like to be able to flop the order of Docker and Podman runs.  He thinks the kernel may pre-load stuff that sometimes makes the second engine faster.

This is helpful for not only comparing Docker/Podman but also different versions of Podman.

###  Container Tools (podman) test day (24:15 in the video) - Mohan/Lokesh/Sumantro

Similar to Fedora test days.  He does FCOS test days and wants to add a cycle for when Podman has a new version to test.

As a requirement, we need to get Podman latest into FCOS so the team could run the tests with it.

They could grab Podman packages from the Fedora Test systems before it goes to stable.  

Generally, Podman releases every two months in general, with Release Candidates two weeks prior.

The biggest one for us is install testing.  Matt thinks running our system tests on FCOS would be good, but Brent thinks that environment might be challenging due to the packages that would have to be added to the FCOS image.  Sumantro said we could instead use Workstation for the test.

Generally, FCOS is used as a server, while FCOS workstation is more client-side.

Paul is unsure of the advantage of running system tests in this environment.  He thinks it would be better if we had users running tests rather than automated ones.

Lokesh would prefer to start this in the second week of April or later.

Mohan asked if they can do performance testing as well.  An example test [app](https://testdays.fedoraproject.org/events/152).  Sumantro could write stuff up and maintain it.  We could potentially use Valentin’s tests, but we need to figure out how to determine baselines and retain them.

Mohan also asked if multiple architectures could be tested.  The challenge here is to find the machines that can be used.

Chris pointed out that along with the test results, we need to capture the system setup, down to the kernel versions that were in play.

Dan noted that we don't alway get our release notes out in a timely manner, and we should in order to help this testing.  The issue with that is the time necessary to put the notes together.  Building a chopped version more quickly might be doable, but will need investigation.  We should at least be able to get a list of issues out more quickly.

Paul thinks it would not be a problem to run a benchmark with a before version and then the test version of Podman.

FYI, here's a [Podman Test Case](https://fedoraproject.org/wiki/QA:Testcase_Podman) that was used in the past.

As far as `podman machine` goes, we could test on FCOS Workstation, then the testing would be useful and valuable.

Mohan wondered if they had any Mac/Windows based testing.  They do have some, that can be used.

Paul noted the big thing is writing up the test cases to see what should be tested.  Most of the CI is for regression testing only.  He suggests that we might ask people provide test cases within a Pull Request statement.

What is the next steps for moving forward with this?  
Sumantro needs a pointer to tests that are not covered.  He could do so via issues on the GitHub.  Targeting mid-April for the first test run.

#### Open discussion (49:00 in video)

1. Lance asked how the port works between the mac, machine and the container.  If he publishes the port, it seems to be exposed on the mac.  He wants to know if he can connect the port to the podman machine directly rather than the mac.  Paul says not doable now, but we can take a feature request in GitHub and will publsh it.

	Brent asked if he wanted to publish the port beyond the machine or did he just want to hit it from the mac. Slirpnetns or passt is a bit of a black hole, and you throw something in there, then it comes out where we told it to, and it's hard to select it.  The problem is your running rootless, so there are limitations.

	The virtual machine is isolated from the MacOS, [gvproxy](https://github.com/containers/gvisor-tap-vsock) is the glue that lets you do port handling.

	You will need root privs not only in the 'podman machine vm' but also on the MacOS.

	[gvproxy](https://github.com/containers/gvisor-tap-vsock) is under containers on GitHub, and we contribute it.

	This [article](https://www.redhat.com/sysadmin/run-containers-mac-podman) was helpful to Lance for all of this.


2) Brent asked if ssh keys need to be encrypted in the view of others. A [Discussion](https://www.redhat.com/sysadmin/run-containers-mac-podman) was started in GitHub. We had one request recently and we're leaning towards doing keychain, but there's been several challenges with that.  

	If they used encrypted keys, the user would be prompted for the password with every command. Adding a key to the key ring has proven to be challenging. Paul thinks this can be done securely with ssh, Brent asked Paul to write up a proposal for the changes he's suggesting.  The user may run into issue when dealing with keys for the podman machine.  Brent is trying to figure out the amount of work for it all.


### Next Meeting: Thursday, April 20, 2023, 11:00 a.m. EDT (UTC-5)

## Possible Topics
1. None discussed

### Next Community Meeting: Tuesday, April 4, 2023, 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. None discussed

Meeting finished 12:08 p.m.

Raw Meeting Chat:

```
You
11:02 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Martin Jackson
11:11 AM
I think the speedup was in milli-seconds, not micro-seconds? Perhaps I misheard
Matt Heon
11:11 AM
Yeah, milliseconds
You
11:12 AM
Thanks for the touch up.
Matt Heon
11:12 AM
DB writes are ~2x as fast with SQLite. Reads are a bit slower, but those only take tens of microseconds, so it doesn't really matter.
Writes being ~5ms for SQLite versus ~10ms for Bolt. Most of which is fsync.
Mohan Boddu
11:19 AM
Someone at the door, bbiab
Mohan Boddu
11:27 AM
back
You
11:29 AM
Valentin, have you shared the hack/perf scripts with Yiqiao and the rest of the QE team?
Valentin Rothberg
11:29 AM
@Tom, no, I didn't share them with QE.  But I see where you're going.  It's probably a good idea to let them know.
Preethi Thomas
11:35 AM
You may have already talked about it as I a only half listening. How about podman-machine/podman-remote tests on FCOS?
Sumantro Mukherjee
11:36 AM
https://testdays.fedoraproject.org/events/152
Sumantro Mukherjee
11:44 AM
https://fedoraproject.org/wiki/QA:Testcase_Podman
Paul Holzinger
11:52 AM
git log --all --grep='\[NO NEW TESTS NEEDED\]'
Brent Baude
11:52 AM
i have a question as well
Lokesh Mandvekar
11:53 AM
btw, if someone can back me up on the rpm side, then we don't need to wait for me to get back
Matt Heon
11:54 AM
Could we route the Podman subnet from OS X to the VM? That would let (root) containers be accessed directly from OS X
Lance Lovette
12:01 PM
https://www.redhat.com/sysadmin/run-containers-mac-podman
You
12:01 PM
TY!
Brent Baude
12:01 PM
https://github.com/containers/podman/discussions/17795
```
