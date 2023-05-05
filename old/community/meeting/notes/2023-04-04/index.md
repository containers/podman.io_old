# Podman Community Meeting Notes
## April 4, 2023 11:00 a.m. Eastern (UTC-5)

### Attendees (17 total)
Ashley Cui, Brent Baude, Christopher Evich, Daniel Walsh, Ed Haynes, Ed Santiago Munoz, fpoirotte, Giuseppe Scrivano, Jake Correnti, Mark Russell, Matt Heon, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Tom Sweeney, Urvashi Mohnani, Valentin Rothberg

## Meeting Start: 11:03 a.m. EST
### Video [Recording](https://youtu.be/B1OynYGBHz8)

## Netavark Plugins
### Paul Holzinger
#### (1:30 in the video)

#### Demo (1:45 in the video)

The next Netavark will introduce plug-in support for the network. Paul showed a Rust plugin and ran through the code.  He copied it to /usr/local/netavark.  Now when he does podman info, it shows the plugin.  He then did `podman network create --driver host-device-plugin --interface-name test1 test1`, and it created the `test1` network.

You can code what you want, and he's provided a simple Rust interface.   To use, you need to define a create and teardown function in your plugin.

You can then do a `podman network inspect test1` to show the characteristics of the plugin.

The goal is to allow CNI plugins to be modified into Netavark plugins using this ability in the future.

## Podman Machine OS Demo
### Ashley Cui
#### (9:07 in the video)

A new suite of commands in `podman machine` lets you build a container image and add packages into your VM on the Mac.

### Demo - (9:14 in the video)

She created a machine.   Then showed a Containerfile with RHCOS to build an image using a regular `podman build` command.

She then used apply from the image to the machine, and it bumped the Podman version on the machine, which took effect after the machine was rebooted.

Useful for folks that want to try different versions of Podman in the machine, especially useful for testing.  You only need to know about Containerfile information, rather than the VM's interfaces.

It supports pulling the images from anywhere.  So you could push an image to a registry, then multiple users could pull the image and get the same image at each one..

Brent thought of two use cases.  One to run the latest Podman in the machine, great for development.  Also useful for non-native arch builds in the machine.

Matt asked about OS reversion and whether updates would happen automatically.  Ashley said it should, but she's still testing the scenarios.

## Podman Database Update
### Matt Heon
#### (19:18 in the video)

An update that should be invisible, but just as a heads up.  The database system is currently BoltDB and we thought it did what we needed.  However, a number of data corruption issues with BoltDB have arisen lately, and not a lot of support from the providers.

The Podman team decided that it was no longer safe to use BoltDB, nor support it.  So a new SQLlite interface is being used.  In Podman v4.5, it will be available for use, but will not be the default.  Likely that in Podman v4.6 it will be the default.

We expect better stability, better performance, especially in large reads of images.

Most people won't care about this for the near future.  We will announce BoltDB deprecation and then provide scripts to change over later on.

## Open Forum/Questions?
#### (23:45 in the video)

1) When is Podman v4.5 coming out?
	Idealy late next week, RC1 came out yesterday, and the final version late next week with a couple of RCs before the final.

2) Next version of Podman in RHEL will be Podman v4.6 in RHEL 8.9/9.3.   Podman v4.4.1 will be in RHEL 8.8/9.2.

## Topics for Next Meeting

1) Quadlet demo.
2) Podman v4.5 Demo - Matt
3) QM quadlet - Dan
4) Podman Desktop v1.0 - Stevan Le Meur


## Next Meeting: Tuesday, June 6, 2023, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday, April 20, 2023, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:33 a.m. Eastern (UTC-4)


## Google Meet Chat copy/paste:
```
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
You11:04 AM
If you have not signed in, please do so in hackmd: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Brent Baude11:10 AM
this is awesome
Paul Holzinger11:12 AM
netavark plugins PR: https://github.com/containers/netavark/pull/509
needs someone to review and merge :)
Matt Heon11:13 AM
I'm on it. After lunch at least.
```

## Raw Google Meet Transcription
```
ieq-pxhy-jbh (2023-04-04 11:02 GMT-4) - Transcript
Attendees
Ashley Cui, Brent Baude, Christopher Evich, Daniel Walsh, Ed Haynes, Ed Santiago Munoz, fpoirotte, Giuseppe Scrivano, Jake Correnti, Mark Russell, Matt Heon, Mohan Boddu, Nalin Dahyabhai, Paul Holzinger, Tom Sweeney, Urvashi Mohnani, Valentin Rothberg
Transcript
This editable transcript was computer generated and might contain errors. People can also change the text after it was created.
Tom Sweeney: Hello everybody. Welcome to the Clubman community meeting today is Tuesday, April 4, 2023. Just as a reminder, we are. We have this meeting every other month on the even numbered months, we talked about all things podman or containers with any kind of demo or discussions along those lines. Topics are driven by people sending me stuff for me asking people or people coming along and or sometimes within our groups being asked to set something here. And again, anything for pop, man, build a Scorpio or any of their Well, probably be helpful if I actually shared my screen as well.
Tom Sweeney:  Build our Scorpio and related projects, I'll be taking meeting notes today within the hack. MD, If you see something that put in that's incorrect or you want to add a link or something to that, please feel free to do so. And then for today, we will be talking about net of our plugins with Paul Holzinger. Then Ashley Q, Ashley will be doing a five man, machine OS demonstration for us. And then that will be talking about podman updates for to the database that we're working on right now coming out soon. And then we'll be talking about topics for next meeting And/or. Any open discussions that you want to have So, with all that, I'm going to stop presenting and I'm going to hand it over to Paul.
Paul Holzinger:  Okay. I am going to share the screen.
Paul Holzinger: so, none of our plugins is for a way to Manage certain extra wishes which you want in your network setup. So with C&i where you could customize a lot, you could write your own plugins and network only supported Bridge. Make VLAN and no IPV then.
Paul Holzinger: that's, That's good, but not enough for some users. So, with the next version we gonna introduce plug-in support and network, And I'm going to show very quick. I have a small example. Written in. Rust.
Paul Holzinger:  It's so the concept is pretty simple, you're plugging can create a network config. Then it needs to do. set up, which is just, Like, set up would be. Creating an interface in a container namespace and connecting it to the host. And you can do pretty much what you want. That's whatever you call. And tear down should pretty much. Be the inverse of setup. So we moved in the face again. And yeah, that's that's pretty much it. That I can. I can link to PR afterwards where there's a documentation holder. And convict chase and looks and how it works. Pretty much. And with that, I have a simple.
Paul Holzinger:  Simple plugin here. Host device plugin. I Copied to the. User local like never Mark directory, which can be configured and containers.com. And now, if I have to. Portman info. I should see. On the network that it detected. The plugin here. and that means I should be able to do a simple portman network create Driver. And then host device plugin. And the host device. Plugin is example, is just very simple one that Most host interface into the container, and if you stop the container, we move the interface back to the host.
Paul Holzinger:  And that there's a new option. I will editor in something.
Paul Holzinger:  Interface Name and I create already created an interface like on my host. I have a test one. And then I give a network name. Also test one so I can show the interface. Just one. And if, you know, run a container, Apartment run. Network test One. Alpine. And take a look. Test one must moved in. And if I show again, it's back. So if I Run this in the background pretty quick. Just to show that. It was really moved 10 seconds. Let's see the interface is gone.
00:05:00
Paul Holzinger:  If we made this moment,
Paul Holzinger: no, no I'm just yeah now the container stopped it's big so,
Paul Holzinger:  Let's just a very simple example. You can. Code, whatever you want in there. And I provided a simple rust interface. To automatically take care of. the so it's a it's a external binary you have A sub command for create, for setup for teardown. And if you use the Small rust binding. It will take care of the setup and stuff and then you just Let me see if I can increase the size. Yes.
Paul Holzinger:  like the that's the pretty much what you need in your plugin and you import You import the trade? And then, you must define. a create function, a setup function, which gets the like the path for the network and Yeah, this settings like the third like the network config I can. it's You get order in for you, you can put in a network config and do whatever you're like. So if you do the
Paul Holzinger:  Network inspect.
Paul Holzinger:  So this kind of information your your plugin sees as well. And then you can decide what you want to do. And if you use the - subnet option and stuff, you have the top nets in here like like you are used to, if you Inspect, the normal network, like you have all all the information. And with that, I'm done if there are any questions, please ask them now. Or later.
Daniel Walsh: You see people modifying CNI plugins to work with us? The goal.
Paul Holzinger:  That's that's the goal. So because we are gonna deprecate, CNI at like remove it. At some point, we are going to remove the roof to the support and to have a way for some people who are currently having their own custom work. They need to Adapt to to this new one or use a standard driver or there are many ways to set up network of even without that you can use a custom network namespace path. But with this it's pretty simple because the setup and teardown is is built into portman right in into the container life cycle with all having to manage anything as
Paul Holzinger:  and advantage to the scene icon and instead I integrated the support into Portman network Create as well. So you know we've seen eye plugins custom stuff, you need to manage your CONFIGS on there and place it in the right direction. With that, you're just network create and
Paul Holzinger:  Hey, Google.
Daniel Walsh: Very nice.
Tom Sweeney: Any other questions?
Tom Sweeney: Right, thanks Paul. Look great. Ashley Potman Machine West, demo
Ashley Cui: Yeah, I'm gonna share my screen. I demo this already and the container plumbing days but I'm going to show it again for those who aren't that conference but basically we have a new command in podmachine called Padme Machine OS, apply or It's a suite of commands applies. The only one in there at the current moment but what it allows you to do is Ontrador Cora Space Systems which is the default OS for Padre, Machine on Mac and Linux it allows you to take a container image and
Ashley Cui: Add packages based on or build a container image from like a container file and an ad packages into your VM, through rpmos tree,…
Tom Sweeney: Off.
Ashley Cui: which is the package manager for Fedora chorus. So I'm just going to play my demo over here. So I'm going to start a…
00:10:00
Tom Sweeney:  because,
Ashley Cui: where I'm going to make a new podman machine and parts of these. Are sped up for four times sake but it's all like yeah. Anyway,
Ashley Cui:  And then I'm going to start the machine that I just created so this is just like kind of your vanilla machine. Nothing special inside of it, just your default pond machine. And then, so I'm going to check the podman version and outside the machine. Is the server is, or the server inside the machine is 441, and then the client outside the machine is 4.5. And then. So now I have this container file, it's kind of a standard container file from, but it has Fedora Cross as the base image and what what I'm doing is I'm running rpmos tree and updating containers or podman and it's friends to the most latest upstream version on main and also removing a bunch of stuff. um, and so I'm going to use this container file and build an image.
Ashley Cui:  And also tag it correctly. I assume
Ashley Cui:  and then, so it's gonna this is just a standard podman build like there's nothing special in a regular podium builds command
Ashley Cui:  And so now we have this image that we just built. in our, Local storage.
Ashley Cui:  And then again, checking the cloud inversion inside the VM, it's 441 outside, it's 4.5. And now I'm going to do a pod machine osupply to the and specify the image that I just built and it should apply it to the default POD machine. You can use if your pottery machine is, you know, name something else. You can use that as a second argument and it will apply it to that machine. And then I for Is to take effect, you have to reboot your machine.
Ashley Cui:  And then now if you take a look at diversion inside of the VM, the pod machine, it's upgraded to 4.5 dev so you can see. So this feature is like particularly useful for people who want to experiment with different packages and versions of podium inside the the pod inside the machine. So I guess like For example, like the desktop team uses this or can use this if they want the latest upstream version of podman inside of their pod machine to like, tests and stuff. And again like it allows users to customize the machine in a familiar way so you don't have to go and build new VMs and learn like VM tooling you can you can use what you know which is like container files and building images in order to customize and put whatever you need inside of the VM.
Ashley Cui:  By by just building images and using problems, you know, a supply. So that's that's basically the demo if anybody has any questions.
Daniel Walsh: Showed you updated from container storage inside of the machine. That was So could it could I call could I do that with a registry?
Ashley Cui: Yes.
Ashley Cui: Yes. So it supports anything that like podcast supports it, anything that like Scopia supports, you can pull it from a registry, you can pull it from local. You can do a bunch of stuff. Yeah.
Daniel Walsh:  So if I if I was a company I wanted to do this I could push to a right. I could push it update to a registry and then every one of my users on all the different machines automatically. Do they have do that machine update from a registry and everybody would get the same version. Correct.
Ashley Cui:  Yes, absolutely. Yeah.
Daniel Walsh: Cool.
Brent Baude: I'll just add that. I think there were two use cases in mind. When we went through this design, and Ashley showed the one where we can run the Latest pod man inside the machine, which is great for development and testing. The other one we've had in in mind is the folks that are wanting to do various multi-arch, or non-native arts. Builds or runs or testing, where they need some commute package to be on there. Which does not come as a default. So this is a easy way to plop those on real quick and be able to do whatever it is. You you had in mind.
00:15:00
Daniel Walsh: so, two weeks from now with new Core or West comes out. And gets updated what happens? Then
Brent Baude: What?
Daniel Walsh: We have to rerun the apply is. Rebuilt with rebuild. And then do we really apply, right?
Brent Baude: Are you wanting to revert or…
Daniel Walsh: now, I'm just saying so I've added I guess there's an example.
Brent Baude: do you want to get done?
Daniel Walsh: There's a question out on One of the issues, someone wanted installed QM user. You know, that's 390 and…
Brent Baude:  Yep.
Daniel Walsh: so they install it, they go through this procedure, they install it. And we're running for OS 37 and 37.1 comes out. Now they want to update,…
Brent Baude:  Sure.
Daniel Walsh: they're gonna have to go through this procedure again to
Brent Baude: If they no longer require the 390 packages, they could just simply take, take the update. or they could just execute a rebuild, which would in the container file would have from you…
Daniel Walsh:  Okay.
Brent Baude: with latest which would mean the new version that the door chorus just made, so then A simple rebuild would be enough to do it and and ideally users would be doing a stop of CI. Type things or off of github actions. Where if a repo changes, it would just automatically build and that way they consume, and then it wouldn't be on the user's shoulders to do that manual. Work.
Matt Heon: Question. If I were to decide to switch back from my custom OS supply, to say Standard F cost, the stable train, does that put me back on automatic updates or am I going to have to do something to get back on automatically updating?
Ashley Cui: So I'm working on the current OS revert. The way that it works right now is it should I put you back on automatic updates? Because I think the automatic update driver is called like Syncotti and that if it detects that you're on a regular stream of fedora, then it should automatically update from what I've seen. Not 100% sure, but from my testing, but it just depends on like what your base was before I believe.
Tom Sweeney: Any other questions for Ashley?
Brent Baude: This is going to end when you the one of the things that takes a little getting used to here is we'd very much have had a feeder in Fedora chorus. But now this pivot you have to think of your OS as a container image. And then those all those things we've learned about being an image, maintenance applies,
Tom Sweeney: Pretty. I'm hearing anything else at this point, so I think I'm going to turn it over to Matt for the podman database update.
Matt Heon: All right, so this is in updates on some internal things on podman that you should not have to care about but unfortunately, you may have to with the coming future. Uh, so podman has a back-end database and if you're just upon an user not developer you probably have no knowledge of this because it's used purely for internal things. We used to store the state of containers and figuration containers, things like that. Um and this was previously in something called Bolt DB, which is a native glen better database, very simple and we thought that it did everything we needed. However, over the last year, so we've become aware of an increasing number of reports of data corruption with both dB to the poor. I wouldn't call it common, but if you are to shut your computer down on expectantly, while Bolt is doing something, there is apparently a fairly good chance that you're going to end up with an unusual database.
00:20:00
Matt Heon:  Which means all your containers are gone, basically, requires complete recreate. So we've been looking into this for a while now and we came to the conclusion that it was not really safe to continue using Bull TB. It was unmaintained, there was basically no error handling. There was no path to data recovery and it didn't seem like it would be reasonably possible to create or to fix it rather. So that it did not corrupt itself. So we have investigated alternative database solutions and we now have an alternative database driver written up that uses SQLite instead. So right now, this is just gonna be a tech preview thing that is going to come out with the next partner and release Pod Man. Four, five of the next couple weeks and it's not going to be default for now it's just for people who want to opt into testing it at some point in the future. Probably Paul man for six we're going to see about making it the default for new installations.
Matt Heon:  existing insulations, will continue to use both DB And at some point in the further off future, we will investigate removing multi-b completely. And basically, having only SQLite and again, primary things you can expect from this transition. One stability Pod, man will stop eating its own database in cases of unexpected power loss. That's obviously, plus two performance in some operations, especially read operations. If you have large wise of containers and you're doing something like a podman PS, you can expect a significant performance boost. And three long term stability, we feel that SQLite has a much more vibrant and large community than volt dB does and as such there's a lot more potential future growth there in terms of performance, in terms of stability.
Matt Heon:  Potentially features but we're probably not using those. It's going to be a very simple database driver still. So generally speaking, you probably should not have to care about this for this foreseeable future, but at some point in the future, we are going to be announcing a the deprecation and removable DB And when we do that, we will have steps for you to take to get on the new SQLite driver if you haven't already and you probably won't have to. Because again, new installations will be switched over to SQLite. Won't before that And that is a general summary of what to expect with our move to seek lights. Why we're doing it? What to expect
Tom Sweeney: like,
Matt Heon: Any questions?
Tom Sweeney:  Very quiet bunch today.
Tom Sweeney: Right, I'm not hearing any questions for that. So I think we'll do is go on to the open form and questions that just ask. Are there any general questions or comments that you want to make?
Daniel Walsh: I'll guess I'll ask a question that I potentially know the answer to One is pardman Ford, our five coming out.
Matt Heon: Ideally next week late next week, we have rc1 just came out yesterday.
Tom Sweeney: Five.
Matt Heon: I'm expecting an rc2 later this week potentially an rc3 early. Next week. If we feel, we need it and then a final late next week.
Daniel Walsh: Okay, and I guess the other question would be what versions are gonna be showing up in the next version of Rella?
Matt Heon: What are five will not be one of those. We're expecting our next major. Drop into Rel /. Centos stream is going to be for six, which will probably be more of a late summer type of time frame.
Daniel Walsh: So, I, I would follow that. So right now, apartment 4.4 that one, I think, is that, right? Tom is gonna be in real 902 in Raleigh.8.
Daniel Walsh:  As I asked loaded questions.
00:25:00
Matt Heon: Yeah, we're expecting a 4.6 in nine three and eight nine, I believe. And yeah. Generally speaking, we're going to continue on the same sort of cadence, we had before retargeting for ish, releases per year pot man. And two of those will end up in Ralph from here on out.
Tom Sweeney: And whatever. It's worth the 441, which will be in podman 8892 will be released. sometime in early May
Tom Sweeney:  and then the fourth sixth version will be able to sometime in January. I want to say no February. Getting dates.
Daniel Walsh: Hey.
Tom Sweeney:  Yeah, did somebody popping? but the question,
Tom Sweeney:  Or comment.
Tom Sweeney:  Okay. Also, while we're here, anybody have any Topics Suggestions For the next meeting in June 6, we have one for a quadlet demo already.
Matt Heon: Will probe that would not be a bad time to show off podman 4-5. We're still firming some things up right now. So we couldn't really don't want today but we should have a good summary of what's in four or five by the next meeting.
Tom Sweeney: But anybody else or any other questions otherwise we're going to quite a bit early today but that's not a bad thing.
Tom Sweeney:  Okay, then we'll just I'll just remind for the next meetings. We are having a meeting on Tuesday, June 6th for the Quad Man community meeting which again is the demo, kind of meetings, and our next cabal meeting for the community will be on Thursday, April 20th, which is two weeks from this Thursday, I believe. And those meetings are used mostly for design. Kind of work for plugin or any technical discussions related to the to the code base. Pretty much. And we're always happy to have comments or suggestions or topics for other. One of those, please be afraid to send me an email directly or put stuff up in the discuss discussion forums that we have on Github for providing. And unless anybody has anything else I'm going to End the recording.
Tom Sweeney: Okay, recordings done. Anybody wants anything off offline other than Hi? Jake. Good to see you again.
Jake Correnti: Everyone's good to see you.
Daniel Walsh: Hey, Jake. And yeah at that time Tom I probably do a QM, the qmse Linux thing that I've done internally so I can do that for the next. To explain how we're using Quad LED Auto.
Tom Sweeney:  For the next demo or for the community meeting. Okay.
Daniel Walsh:  Yeah. Next next community meeting
Tom Sweeney:  That.
Daniel Walsh:  and hopefully, we can get an update from five main desktop at that point since they'll be just about to go 1.0 What's the date of that?
Tom Sweeney:  Not know, actually, do you know?
Ashley Cui: Many 22nd.
Daniel Walsh:  What's the date of the next cabal? I mean, the next Emma.
Tom Sweeney: Yeah, well, the next ball is April 20th. The next community meeting is June 6th.
Daniel Walsh:  Yeah, so we could have them fell just release 1.0 so he probably should have them back into a demonstration.
Tom Sweeney:  I'll check with stuff on.
Tom Sweeney: Right. I'm gonna Close up the meeting. I'm not hearing anything else, folks. Enjoy your lunch dinner breakfast. Whatever. Take care.
Ed Santiago Munoz: Let's work everybody.
Mohan Boddu: Thank you.
Meeting ended after 00:30:00 👋
```
