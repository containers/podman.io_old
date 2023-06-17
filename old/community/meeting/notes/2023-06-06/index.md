# Podman Community Meeting Notes

## June 6, 2023 11:00 a.m. Eastern (UTC-5)

### Attendees ( 40 total)
Aditya Rajan, Ashley Cui, Banu Ahtam, Brent Baude, Chetan Giradkar, Christopher Evich, Ed Haynes, Ed Santiago Munoz, Gerry Seidman, gideon pinto, Hyuk Jin Yun, Jake Correnti, Jean-Francois Maury, Jennings, Jennings's Presentation, Lance Lovette, Leon Nunes, listener, Lokesh Mandvekar, Lokesh Mandvekar's Presentation, Máirín Duffy, Mark Russell, Martin Jackson, Matt Heon, Miloslav Trmac, Mohan Boddu, Nalin Dahyabhai, Navaneeth krishna, Nezih Nieto Gutierrez, Paul Holzinger, Preethi Thomas, Rudolph Pienaar, sandip samal, Shion Tanaka (田中 司恩), Stevan Le Meur, Stevan Le Meur's Presentation, Sungmin You, tasmiah chowdhury, Tim deBoer, Tim Rudenko, Tom Sweeney, Tom Sweeney's Presentation, Urvashi Mohnani

### Topics

1) ChRIS project running in Podman via Podman desktop - Jennings Zhang and Rudolph Pienaar
2) Podman Desktop v1.0 Update - Stevan LeMeur
3) Podmansh Demo - Lokesh Mandvekar
4) Podman v4.5 Demo/Talk - Matt Heon

## Meeting Start: 11:04 a.m. EDT
### Video [Recording](https://www.youtube.com/watch?v=65pE8RhCK5w&t=116s)

## ChRIS project running in Podman via Podman desktop
### Jennings Zhang and Rudolph Pienaar
#### (1:20 in the video)

Demo (1:35 in the video)
Showed a picture of a fetus in a Woman's uterus.  Using a lot of niche software to put the project together.  It uses a Hybrid Cloud Architecture.  Jennings has been using Podman Desktop for working on the project.  He's a project that has yaml files that can be used by POdman Desktop.  When he uses a Kubernetes manifest, he uses a script to concatenate all of his yaml's into one, and replaces key values within the concatted Yaml, replacing the Podman socket with the value from Podman info.  Then the Yaml is fed into Podman Desktop.  

It does take a minute or two to start due to init time, mostly database related.

It creates a number of pods, including the ChRIS pod and a ChRIS UI.  It also runs ChRISmatic to do a number of setup items.  He showed the Pods in the Podman Desktop and then opened up the ChRIS UI.

Within the UI he dispatches containers to Podman, and it goes ahead and runs it for him.

The UI interface allows him to build a string to be sent to the Podman socket.  

The entire ChRIS system runs on Podman Desktop.

Brent asked what Podman can do better for ChRIS.  So he wants to make sure that containers can be locked down.  He'd also like to be able to look into the CLI at the container level from Podman Desktop.

A Yaml file is crafted to use as a file to run the project.  That's key to them.  The other thing of interest is how to deploy models of AI.  There's a gulf between the Data Scientist and the Developer.  They are working to shrink that gulf, and Podman is helping with that.

Stevan liked seeing how Desktop is being used by the project.

Jennings rolled back to an earlier version of ChRIS and showed how the Podman interface was used to run it.

The old bash scripts were up to 4 or 5K lines long.  The YAML pipelines to do a fetal brain study uses declarative Yaml which is easier to comprehend by both Data Scientist and the Developer.

ChRIS uses OpenShift for its computing, but unfortunately, their server was down for maintenance.

They went from Docker Compose to this setup.  Docker Compose was easier due to it being insecure, so great for development.  Changing to Podman, they had to deal with the socket rather than the daemon.  There were also some initial problems with rootless.  

Also, the Kube commands didn't respawn as Kubernetes did, so he has to manually restart.

## Podman Desktop v1.0 Update
### Stevan LeMeur
#### (30:25 in the video)

The last demo Stevan thought was a great use of Podman Desktop.

Showed pod view and volume views.  Took a container, ran it inside of a pod after creating the pod, then ran it locally with Podman.  He was then able to create a new kind cluster, and pushed an image from there into the cluster.  He then deployed the pod into the kind cluster.  

A new set of extensions have been added to v1.0, adding compatibility with Docker, Lima, Openshift Local, and Kind.  You can also make use of Microshift.

Podman Desktop is available and free now.  You can get it from https://podman.io and https://podman-desktop.io.  You can create issues and contribute on GitHub.

Lots of positive feedback at Summit on Podman Desktop.

https://developers.redhat.com/articles/2023/05/23/podman-desktop-now-generally-available#why_use_podman_desktop_

## Podmansh Demo
### Lokesh Mandvekar
#### (41:29 in the video)

podmanssh - used in conjunction with quadlet.  He showed out to ssh into a demo user on a Fedora machine, and it brought him into RHEL. Open PR: https://github.com/containers/podman/pull/18739


## Podman v4.6 Demo
### Matt Heon
#### (44:47 in the video)

4.6 and maybe 4.7 out this summer.

4.6
bug fixes, podman machine and qudalet updates.  Sqlite as backend.

Working on final pieces with Netavark,.  For machine two new hypervisors in flight, hyperv in Wiendos, and native mac.  Both a WIP at this time, but progress nicely.  Needs to get into Fedora CoreOS.  A lot of that code will potentially be in v4.6.  IOfs working on Apple, relatively speedily.

Working our documenting plans

Brent will be looking for testers, but it's not quite ready at the moment due to ignition work that's ongoing and also socket mapping which hasn't been completed.


## Open Forum/Questions?
#### (50:06 in the video)

1) Experimental storage getting moved forward how to make it happen.  Brent needs to look into this further.  Gerry said it's deployed and works, he thinks s some documentation needs to be added. 

## Topics for Next Meeting

1) Quadlet Demo - Dan Walsh


## Next Meeting: Tuesday, August 1, 2023, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday, June 15, 2023, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:59 a.m. Eastern (UTC-4)


## Google Meet Chat copy/paste:
 ```
You11:05 AM
 https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
 Jean-Francois Maury11:16 AM
 That is awesome
 Tim deBoer11:16 AM
 +1
 Stevan Le Meur11:26 AM
 Super cool!
 Mark Russell11:26 AM
 took the words out of my mouth, Stevan!
 Lokesh Mandvekar11:27 AM
 quadlet demo might not happen today
 dan's not on the call
 Stevan Le Meur11:28 AM
 Have you tried OpenShift Local extension available with Podman Desktop?
 You11:30 AM
 Yeah, no quadlet, Dan sent me a note just after we started.
 Brent Baude11:32 AM
 @urvhashi, can you comment here?
 Urvashi Mohnani11:34 AM
 @brent I stepped away for a min and missed this
 You11:42 AM
 Lokesh, how long will your demo/talk be about?
 Lokesh Mandvekar11:42 AM
 maybe 5 mins
 Stevan Le Meur11:43 AM
 https://developers.redhat.com/articles/2023/05/23/podman-desktop-now-generally-available#why_use_podman_desktop_
 Mark Russell11:44 AM
 awesome update
 Brent Baude11:48 AM
 we need to do 2
 Stevan Le Meur11:54 AM
 TOON of things happening in Podman community right now!!!
 Mark Russell11:54 AM
 +1
 Preethi Thomas11:55 AM
 +1
 Máirín Duffy11:55 AM
 +999
 Preethi Thomas11:55 AM
 lol
 Stevan Le Meur11:55 AM
 Get podman up and adopt a seal !!
 Máirín Duffy11:58 AM
 thanks Jennings and Rudolph for coming :) great preso!!!
 Preethi Thomas11:58 AM
 Grreat stuff
 Shion Tanaka (田中 司恩)11:59 AM
 thanks
 ieq-pxhy-jbh
```

## Raw Google Meet Transcription
 ```
Tom Sweeney: The spinning cycles and It Looks Like It stopped. So I will welcome everybody. Today to the Podman Community Meeting Today. Thursday June 6th 2023.
Stevan Le Meur: Krishna.
Tom Sweeney: We have a large list of things to go through today. First thing that we're going to be looking at, is the Chris Project learning and podman via podman desktop from Jennings, Zinc, and Rudolph. Can you Allen? I hope I didn't butcher either of your names there for that one. Matt in, we'll be talking about the problem and 4.5, And then Dan Walsh if he's here, I'm not sure, there's kind of some question about whether or not to be able to make it today, we'll be doing a quadlet demo.
Tom Sweeney:  And then the plug-in desktop, 1.0 update will be given my stuff on them here and then a portman sh demo will be given by Lokesh at the end. So we've got a pre-fold day, we will have time for questions if you have some and with all that I think I'm going to just all mine folks that we have a hack MD script, which I'll put a link to in the chat. If you I will be taking notes there. If you see that, I done something badly in the notes, please feel free to Ed and presenters. If you have links or such that you want to make sure that we have, the notes that will be posted later on the website. Please go ahead and add those to the hack. Empty. Yes we go on. So I'm going to stop presenting now and head it over to Jennings. It's gonna be talking about the curse projects.
Jennings: All right. Hi everyone.
Jennings:  Alright, so my name is Jennings and I'm supervised by my Pi Rudolph Pienaar together. We're working on the Chris project at the Boston Children's Hospital. And our lab does a lot of research on fetal imaging and also newborn imaging where we use MRI to study very young patients. And so what you see on screen here is an example of what a fetus MRI looks like, while it's still in the pregnant mother seers. To do this kind of research. We need a lot of niche open source software because it's a very specialized division of medicine. And so,
Jennings:  What we're working on the Chris project is helping to orchestrate the digital cyber infrastructure to actually be able to run these open source pipelines just to give a brief example of what one of these pipelines may be. We have a fetal MRI processing pipeline, which is going to take all of these multiple in Europe, images of varying quality. It's going to try to use some image processing. Algorithms such as masking and quality assessment to, finally be able to reconstruct these multiple in utero images into one high quality. Cropped volume. And what we can do, with these processed data, is we can try to quantify metrics of the brain. While it's developing in utero and this is what a fetal brain looks like. While it's still developing at 25 weeks of gestational age through 32, justational weeks of age,
Jennings:  Using these open source tools. We are able to measure the growth of specific parts of the brain as well. And look at the trends as the pregnancy continues. And so the infrastructure that we have at the Boston Children's Hospital is, of course, we have these scanners. We also have open. Sorry. Not we have Some high performance computing centers. And we also have the office space where our researchers sit and what the crisp project does is it connects all of these things together. Uh, researchers can be at their desks looking at the Chris user interface, and they're able to dispatch computational jobs to both our internal high performance computing center. And we're also able to ship jobs out to our public clouds as well with the hybrid cloud architecture.
Jennings:  And so that's a quick demo of or sorry. A quick introduction on what the Chris project is, something that I've been working on recently, is being able to run Chris on podman and especially using podman Desktop So, I'll jump it up.
Jennings:  We have a github repository called Minicrisk Eights. And inside of here, we have several Kubernetes manifests aka Yamls and I also have a wrapper script called Minicris.sh. And what this wrapper script is going to do is it's going to bring together these animal files into something that can be consumed by podman desktop. Let's open up carbon and desktop.
Jennings:  Alright, here it is. I don't have many containers running, I'm just going to delete the sky.
00:05:00
Jennings:  all right, when you want to run a Kubernetes, Manifest using Podman Desktop It Assets, a single Kubernetes file. I have my Kubernetes manifests organized as multiple Yaml files here. So this wrapper script called Mini Christ.sh is going to do two things. It's just going to simply concatenate all of my Yamls together, and it's also going to perform a said command to just replace some of the values. One key value that it needs to replace. We can take a quick look at it.
Jennings:  Yeah, so the function that I'm going to run is going to call be called minicrescat All it's doing is it's going to be concatenating. All of my yaml files and then it's going to be performing a set operation on to these variables. And that's just going to replace the hard-coded podman socket address with what's actually going to be running on my system, obtained from the podman Info command. Let's try that.
Jennings:  And it's just going to spit the yellow out to my standard out and I'll type it into a file. And now this file called Chris All-in-one by EML can be loaded into Podman Desktop.
Jennings:  As it says here with podman desktop. This Play Queue. Command can take a few minutes to complete. And the reason why is because podman behind the scenes is going to be starting the defined services and deployment sequentially. It's also going to try running in its containers which does things like database initialization and that's going to take a little while Another functionality of my monolithic script over here. Is that it can monitor podmin for init containers. So
Jennings:  that finished faster than I expected it to. I was going to say that we can look at what the unit containers are doing, but it seems like everything's up already, so let's just keep going. Yeah. So we can see we have a bunch of pods here we have. What's known as the Cube Pod? And that's our Chris backend. We have PF Khan, which is another Chris service that handles the compute that might be dispatched by Chris. We have the Chris UI which we'll take a look at later. That's our user interface. before we can take a look at Chris, I have a script called Prismatic Prismatic, which I can also run using podman, is going to initialize the Crist system with some information and that's going to create some users for testing purposes, and it's also going to
Jennings:  Add some programs or what we call, Christopher's plugins to the crisp system. And you can see that this mini Crits.sh chrismatic subcommand is just a podman run alias and it's going to run a new container as part of the cubed pod.
Jennings:  It's just going to run the charismatic command within the charismatic container. What that does is it reads a file called Prismatic.yaml to put a bunch of data into our Chris backend. And so what it's done here is it's created a super user called Chris and that's going to be a user that will log in as in a quick moment and it has registered a few simple programs for us to try running. To access the user interface. We can see that it's running over here on podman desktop. These logs say that it's running on port 3000 though. The port 3000 is mapped onto the host Port 8020, I believe yeah.
Jennings:  So, let's take a look.
Jennings:  This is the Chris user interface and from here, what we're able to do is you can click Login.
Jennings:  And yeah. Great new analysis.
Jennings:  In Chris, we have computational experiments organized as separate analyzes. And what I'm doing here is I'm going to create a new analysis with some uploaded data.
00:10:00
Jennings: And now it's happening, is once I've uploaded the data into the Chris system, we can see it running in this Kris UI and I can choose to run more plugins here. When I choose to run a plugin such as this one of Click Add node, it's going to dispatch a container to podman and podman is going to run it. So if I'm lucky if I type Admin PS then it'll show the container running. I have to be kind of fast.
Jennings: I guess I lied about being the fast part.
Jennings:  It always breaks during demos. I have no idea why this guy ran but this guy doesn't I'll just try it again.
Tom Sweeney: The demographic, strong.
Jennings:  I'll just
Jennings: What was that? Yeah, they are.
Tom Sweeney:  The demo gods are strong.
Jennings: I can do another quick explanation of what's happening here. And what's happening here is This user interface is pretty much. Helping me build a command line. string that is eventually going to be forwarded to the podman socket and so,
Jennings:  This program that I'm trying to run called Simple DS. App is just a demonstration program. We have other programs as you've seen for imaging analysis and medical research. I'm just going to pass a command line parameter here, called Sleep length. 10 because I wanted to sleep for 10 seconds. Oh no, this guy failed.
Jennings: I feel like this one's also gonna fail, but yeah. Sadly, the demo gods have kicked us this time.
Jennings:  Well, that's mostly what we have here. We have the entire care system running in Admin, Desktop any questions?
Brent Baude: Yeah, I have a few.
Brent Baude:  I'm curious. Is there anything that podman could do? That would make this easier for you.
Jennings: Yeah. So Several things podman has pretty much innovated in the space of rootless containers and that's great because Chris is concerned about security and we need to make sure that these plugins aren't going to do anything malicious and if they do something malicious they can't break out of that. Container jail. a second thing is one of the key innovations of the Chris project itself, is that Chris plugins, unlike some other. Systems for computational research. Aims to be simple for developers. And I should be able to look at a terminal you here.
Jennings:  I'm not sure if you guys are familiar with the App Trainer command app. Tanner is a another container runtime similar to Docker apartment. And friends. But this obtainer command could also just be a podman command and podman would be a great candidate for having people be able to run these analyzes on their own systems. Because oddman is rootless and or podman supports rootless mode.
Rudolph Pienaar: If I can just quickly jump in with a meta comma to observation here. So you guys all hear me is my mic coming through. So, one of the things we're trying to do here,…
00:15:00
Tom Sweeney: Yep, bottom plants.
Rudolph Pienaar: right? Is, you know, you're so in the Chris UI beginning of like this, this connected graph of designers, So that's kind of at the heart of what we're trying to make fun, you know, distribute, right? So you can, you can construct and arbitrary complex tree of computing. where each one of those nodes is, is obviously a container and because
Rudolph Pienaar: That's a Jennings show in the beginning. You can have multiple different computing stages as you're doing, one of the things we're trying to do is to be able to publish and bundle together, the value of that computing tree. Simply and easily, right? So you can, you can describe your entire compute as a simple yaml file. Which literally is just describes the tree of computing, your almost a directed basically graph.
Rudolph Pienaar:  Mostly in research. What folks, end up, folks, end up doing right. Is they construct their workflows using bash? Scripts if they get to that level, And you know, as most of us know bash scripts are horrible to try and do anything with. And most of the coding there is is literally just coming, right? You know, it's all to do with data copying from one direction to another and stuff that all goes away in a system like this, you know, leveraging Crisps which sits above, you know, something like podman or Kubernetes, whatever the case may be, all of that goes away. Which we think is can be pretty useful for reproducible, computing and science and stuff like that. And another thing which which is maybe interesting useful to point out of here is and so I was a Red Hat summit last week.
Rudolph Pienaar:  There's a whole bunch of stuff, you know, about how in industry we can. You know. Deploy models of computing. Like AI models. How do we deploy them? The first, I can tell the industry model to do that. Is you take a data scientist working in Jupiter notebook. And that's all they ever do. And then an application engineer or development comes in and takes her Python Jupiter notebook and shoves it into a flask python. Framework or fast API and that fast API thing, you then go and throw on the Web and manage with Kubernetes or partner, whatever the case. and that's if you want, most people are doing and that's, there's nothing wrong with that, of course, but it just struck me that What ends up happening there is that you kind of entrenching the separation between you the primary developer like potato scientists.
Rudolph Pienaar:  Where it's going to be deployed. There's a huge gulf between them. Right. The data scientists. It doesn't know anything about flasks or fast API, they want to touch that. They don't interested in doing that. But in a system that we put together over here, the The actual thing that is deployed on the Web that is managed by Partman is managed by this whole system, is pretty much the exact code that you as a data scientists. Develop. so it's so it that that Delta between your prototype. Code, and the deploy code.
Rudolph Pienaar:  Is much much shallow smaller and shallower than what it, and what is the normal way? It means. So that's another innovation where I super excited about to do you, right? You can develop your stuff, you can be a data scientists. You don't even have in this case here, you don't have to know what man. We doing it all for you without scripts, but you are developing your code and you're able to deploy it locally on your own machine. And pretty much see what it would be like, in production. Skin. Anyway, that's just a quick quick. High-end plug here.
Stevan Le Meur: Well thanks a Rudolph. I think that's exactly what we are trying to to accomplisher. It's helping the developers to be able to produce locally. Things that they would run on production. So having something as close as possible from production is super critical. Who have fast turnarounds, when you are building your application. But also, when you are consuming it, as you use, just the mode in fact so wonderful. The demo is fantastic. I think, and it's really nice to see the technology being used for such cases, as well. That's, that's very nice.
Jennings: So I was able to get what I wanted to show running, which is I just rolled back to an earlier commit. That was working. So what I tried to do was I ran a second, plugin instance here. and you can see what I did was, I was trying to run this program called Simple DS up with a parameter called Sleep Length, 20. And here we can see the output in podman desktop as well. So what the cris system did was once it received the request to run a container. It handles, all of the handles fudging with the podman interface for you, And it created a container with heels and both DS up. And here's the output, I'm not sure if we'll be able to inspect it anymore. Yeah, I can't inspect that any more because Chris decided to delete the container, once it was done running, if it was still running, then you would be able to see the flags here as well.
00:20:00
Jennings:  I also wanted to just quickly show off what Rudolph was talking about. So what I was showing here was just the stages of a biomedical compute pipeline. It often involves multiple steps and multiple programs that are going to be glued together by a bash script. If you've ever done any kind of scientific computing, you would understand what I'm talking about East Bash scripts or even CSH scripts are going to be maybe 4,000 lines long of gibberish. Whereas with Chris how we organize and orchestrate, these workflows is using a yaml schema
Jennings:  over to pull up. My browse organ. this is a pipeline that I've been working on, which Extracts surfaces aka just polygonal mesh, representations of the fetal brain cortex. From a reconstructed brain image and so it does some file conversions and it processes the left and right hemisphere separately. And this is specified using a declarative yaml syntax instead of bash.
Jennings: I also wanted to add to what Stevan was talking about. We have Chris deployed and targeting Openshift container platform. Unfortunately this week we were just on Lucky our
Jennings:  local cloud that we use. It's called the Massachusetts, Open Cloud and the New England Research Cloud. They are doing their yearly power down maintenance. So I can't show that off though. Typically Chris is deployed on Openshift and also uses Openshift for its public compute and one of the things about podman is it makes it easy where we can have this one set of Kubernetes, DML manifests that work on both Openshift and also just locally on my desktop
Jennings: I don't know if I'm supposed to be calling on people, but hello Matt.
Tom Sweeney: Oh sure. Go ahead.
Máirín Duffy: Hi. So my question for you because I know you guys were previously using Docker compose and I just wanted to know how was the transition been kind of coming from Docker compose into this setup?
Jennings: Yeah. Um, perhaps we should I noticed next in the schedule, someone's talking about quadlet which is something that we need to look into. I'll talk about why right now actually using Docker compose is a lot easier. For not necessarily the right reasons. It's because the her compose has a Insecure by default kind of mode of operand, which is great for developers. but, One of the things that I'm curious about is just trying to enforce the principle of least privileges here, and moving into podman was more difficult because of the Damon list thing. We need a Damon to talk which is why I'm running the podman socket and also the rootlessness thing, There were a few bugs there. But in general, the experience was somewhat good.
Jennings:  There are some key differences between how podman cube play works and how the actual Kubernetes system works or how Docker compose works. The two biggest discrepancies, are going to be that.
Jennings:  Podman cube play. Operates sequentially. What that means is it's going to create one pod or sorry. One container at a time and that's a problem. When you have containers depending on each other, in the world of docker, compose, or Kubernetes. These containers are going to start Asynchronously meaning If the dependencies aren't resolved, they'll just restart in a few seconds. And podman. I need to do the dependency resolution myself and how that works is. I've prefixed these with numbers denoting the order in which they are dependent. So I need my config maps first. And then I need my database and Q. Services which my backend is dependent on and then I have to run my back end near the end because it's dependent on the database and rapid MQ.
00:25:00
Jennings:  Yeah, Brent.
Brent Baude: Let me check with Tom first on time check, how are you feeling Tom.
Tom Sweeney: And we've got all just a few more minutes. I can go five more minutes but that's gonna be pushing it.
Brent Baude:  Okay, I'm curious then. So when you say that, When you say that before with, I think it was composed and it's done. Sort of asynchronously. Are you handling?
Jennings: in docker compose, it's possible to specify the dependency order of containers. And that's not a perfect solution, but it is.
Jennings:  Better than sequential.
Brent Baude:  Okay.
Jennings:  I think it's also supported in podmin composed, but we've tried to move off of podman compose and into podman play cube.
Brent Baude:  Okay.
Jennings: So what you can see is when I'm running the Chris container over here, this is a docker compose file. I can increase the font size of it. This Chris service is defined with the auctions depends on, and the pens on is a list of other services, which must be started before the Chris service. This is good because we can make sure that these other services at least exist prior to Chris. This isn't a complete solution, because even though the containers themselves exist, these service might not be ready to accept connections yet, but still docker, composes able to figure out the dependency order and then start these both.
Jennings:  Asynchronously. And in the order that would satisfy the dependency tree with podman currently, the dependency resolution must be handled manually. This is also somewhat deviant from the communities spec. I'm not sure if it's part of the Kubernetes spec, but I would assume. So that every resource specified in a yaml file, Or sorry, the order of resources specified in a yaml file, should not matter. So,
Jennings:  What I have here is, I have a yaml file of a bunch of Kubernetes resources, they're separated by the Triple Dash syntax and in theory, or ideally the order of these services shouldn't matter. But when you're running it using podman, whether it be through podman desktop or podman cube play, the order does matter. You need to specify the dependencies before the dependence.
Brent Baude: Okay, thank you.
Tom Sweeney: Any further questions. This has been great presentation. Great discussion.
Brent Baude:  I assume Tom has your contact information if I would want to follow up, you 'D be willing to answer some.
Jennings: Yeah. Oh, I mentioned Someone's later going to present on quadlet. I would be very interested in hearing more about quadlet because to my understanding Quad lit, is where podman uses system D as DC. Orchestrator of some sorts. And so hopefully, system D can sidestep this issue. With plodman cube in my understanding, is podman is starting these services sequentially. But if we were to define domestic D unifiles and system D does start services in parallel. I hopefully this dependency resolution problem goes away.
Tom Sweeney:  Know unfortunately the speaker had to back out literally just after the meeting started. So we're not going to be discussing quality today but we can certainly get you in touch with him if you'd like to.
Brent Baude: Who was the speaker, Tom? oh, Okay, we can. Yeah, we can do, we can arrange something for you.
00:30:00
Tom Sweeney: Then, okay. And then not as moves, you down to the bottom of this agenda today, just so we can get to the other things too. If we don't get to the four, five update, I think we can get by without that. So next. Okay, next up. Step on me and just stop update.
Stevan Le Meur: Yeah. So I I think the demo that was just done by Jennings was a, just a very clearly illustration of how pen mendes that could be leverage for helping streamlining, container walkthroughs and streams. Most and if you can developer experience so this is great introduction. I will say so on, I'm going to share my skin. So we just announced the version 1.0 of Batman Desktop and We are really two weeks ago.
Stevan Le Meur:  In this version, as you might already know, we provide a user friendly interface for managing containers and working with Kubernetes directly from the local developer machine. So that's a bunch of things that we are trying to, to do from a component desktop, like abstracting the setup and the configuration of the entire container tooling. So you can create your appointment machine directly from the UI and you have the ability to to create your machine.
Stevan Le Meur: With or without good privileges as well. And as it has been demoted as well, just capabilities to play Kubernetes yamls directly from from the UI. So you can see your buds you can see The logs, you can interact with. we said with each of the containers, And you can get the Kubernetes manifests for. Somewhere. Oh, you applications. So you can easily test that onto. Onto a unto donuts around. So I can take A container.
Stevan Le Meur:  And I can say, Hey I want to run this container inside of a bud so I can create a pod on my container. I need locally with a man. and then, once I have this this environment, which is a, which is running, Once I have my bud running locally with Batman, I can easily deploy that onto Kubernetes environment. So I can test it on two different Kubernetes around and right now. From Batman Desktop, you can create a kind cluster which is a Kubernetes. Christopher running in input, man. So you can create the cluster.
Stevan Le Meur:  You will, you will have that NDF there are after a few seconds, a few few minutes depending on the on the network. And when you are in the context of of your bird and your images, you will have the ability to easily insight with the cluster so you will have the ability to push an image that you build locally. With Batman and you will be able to push that image directly onto the gain cluster. To use it into a deployment or into service that you you want to try out locally? So, this is one step. One step further in some sense.
Stevan Le Meur:  Once you have your game cluster, it appears as a container in your list of container. So I have it here in you. I can see the logs. And what's pretty interesting is that I can also directly from the here. I can also interact directly with a research there so I can Also, do a computer comment directly from the from here. So if I have my bud that I just create I can say, Hey, I want to deploy. That bird onto my chemical stuff so it's you use a superman coming to generate the Kubernetes manifests.
00:35:00
Stevan Le Meur:  And and then it selects the Kubernetes context and I can do the deployment. Of my bud directly on tour. Onto my calendar. So share, it's probably pulling the image and now engine is running and I can see my part running locally in Batman, but I can also see it running on Kubernetes kind of stuff here as well. So this has a type of workflow that you you can leverage to make make it easier for you to have your turn around and you to test your application. More easier. As well.
Stevan Le Meur:  Coming with the version 1.0 we have a set of of extensions as you know, Batman Desktop. He's a, he's a it's open to multiple container online and Kubernetes distributions so that's compatibility with with the care Lima and for Kubernetes, we have integrated kind. But there's also the ability to run Openshift on your local developer environment. So you you can directly install the extension from from the screen. And once you have the application, the extension installed you can trade. An open shift, local environment. So I already have one. So, It's not going to.
Stevan Le Meur:  Turn that you have the ability to configure your bunch of local with two different presets. So either you can use an open shift, local an open shift, single cluster single note, cluster on your local environment. Or you can also use a lightweight version of Openshift which is micro shift that you can run you locally. So this is what I am running. Here and you obviously ability to switch your Kubernetes context from gain. To Microshift. So, if I have An image that I want to deploy to Microshift. I can also do that directly from on the list of images. And I can.
Stevan Le Meur:  Deploy. I can deploy you. Birds, I can deploy Kubernetes cmls directly onto a main micro shifter environment. We also integrated the capabilities for enabling the Docker compatibility mode. So this enable to map the docker circuit directly to to put men, but also use the command lines, that some developers may already be familiar with. So this is prettier pretty as well. So, it's available.
Stevan Le Meur:  Today it's free. You can download it from a ferment desktop dota you open man.io. As well. And we are always looking for feedback and you new new ideas on things that we could be. We could be improving. So feel free to engage on the requisitory as well, so you can create issues. And you can also report feedbacks directly from within the application so you can share your experience. And tell us, what are your suggestions as well.
Stevan Le Meur:  And with this, I think. I covered.
Stevan Le Meur:  The Intel. On Badman Desktop 1.0. So the lunch was two weeks ago, we have been getting a very positive Feedback from from the community. We had a lot of blog posts and the media coverage but there is also
00:40:00
Stevan Le Meur:  Really announcements that we are. We published on a developers that had that come. So feel free to to give you to give a look, if you are interested, otherwise looking for hearing you your feedback and your thoughts. On the product.
Stevan Le Meur:  Any questions?
Tom Sweeney: Another question but would you share the department.io site real quick? It's the fun. Yeah, just for a moment,…
Stevan Le Meur:  Sure.
Tom Sweeney: I just did want to mention that we have Mole here and That has been revamped greatly by her and other folks and it's looking phenomenal right now.
Stevan Le Meur:  Yeah, it's the new website is looking fantastic. So kudos to to move what's been working on this quite easily and it's it's I think what Batman was deserving so, really cool to see.
Tom Sweeney: Yes, thank you. And thank you once again. Well, it really is great. all right, that we're going to move on to Lokesh talking about Paul man, shakes
Lokesh Mandvekar: All right, let me share my screen. Stevan, could you stop showings
Stevan Le Meur: Sure.
Lokesh Mandvekar:  Well.
Lokesh Mandvekar:  All right, I guess you can see my screen. Oh, all right, so first off, what's the problem at hand? So as a system administrator, I would like to confine each user to a predefined show environment and in that environment a user would have access to volumes and capabilities specify for that particular user. Now, what is Plug-inch? Odman SH is an executable user been augments h along with a container by the same name. I'm going to search now. This container is managed by a user quadley. With the login shell, set to the plug-in SH executable. When the user logs into the system, they enter the podmanus H container directly. Now, let me do a quick demo. So first, let's check the current user is
Lokesh Mandvekar:  So that's the current user with the show set to bin Dash. Now I have created a demo user for this purpose. Now, this demo user has shell set to User bin podmanish. Also, with the user quadlet created for this demo user.
Lokesh Mandvekar:  Books.
Lokesh Mandvekar:  So this is a basic quadlet that's been created for the user. The image has been sent to Ubi-9 minimal. Now, let me first. See what posts I'm on. I'm on Fedora released 38. Now, I'll ssh into the system as gonna be user.
Lokesh Mandvekar:  Okay. so I'm ssh in and as the user demo,
Lokesh Mandvekar:  Environment is a real environment. As was specified in the bottled file. So, current status of this work, this is still working progress. There is an open PR, I'll link to it in Hack MD. Now this might get into 4.6, as a tech preview, but it should be ready for the release after 4.6. And that's my demo questions.
Tom Sweeney: Not hearing things.
Lokesh Mandvekar:  All right. Yeah, Tom back to you.
Tom Sweeney: Right, Lokesh. Thank you. That's great. And Matt, do you want to give us a quick rundown? What's happening with four or five?
Matt Heon: I honestly I think I'll just take the opportunity to go on to four six and future release plans because four five is, this point is two months old. so,
00:45:00
Tom Sweeney: What?
Matt Heon:  Generally speaking, we are planning at least, one more release this summer, but there's still discussion going on in the team as to whether we're going to do two one end of this month and one somewhere in August, or just, just one release, which would be probably mid to late July. So we're not completely sure on this, but you were getting at least a four six and potentially a four seven by end of summer, we're hoping to firm this up and get an actual document out that will describe future release cadence at some point, but that's still being worked on as to what you can expect. And for six generally speaking improvements to podman machine, especially around Mac, and Windows improvements to quadlet and just general bevy of bug fixes that you usually gets also at some point, maybe not for six, but some point the future we are going to be making the new SQLite database back and the
Matt Heon:  Fault, still needs to be discussed if it's mature enough to do that and four, six. This should be only for new installation. So I don't expect any significant changes from user perspective, but that is something to look out for. And I think that's about it. I could go into four or five features again it's two months old and at our current cadence, that is a agent history.
Tom Sweeney: Now, that's fine by me. Brent, did you have anything to say? You look like you had something you wanted to sing?
Brent Baude: You know, no, but I can add to it. We're currently just sort of looking at…
Tom Sweeney:  Okay.
Brent Baude: what we're working on where Matt hit a lot of it. We're working on some final pieces for Netta Mark. Parody with CNI. And in terms of machine,
Brent Baude:  But I currently have two new hypervisors in flight. And one is Hyper-V. For windows. And the second is the apple hypervisor their native, one rather than c** you. Both are progressing nicely. Because their new platforms. For fedora coros, it does have to go through a rather. lengthy process and get into their release process, to where images would be automatically created.
Brent Baude: On. But a lot of that code will be in four six and potentially for those chomping at the bit they can Check out if it fixes or solves any problems one. Very good thing. I'm happy to report is we have hurt Ilfs, working on the apple, Hypervisor part and it's quite fast.
Brent Baude:  I think that's it, Matt.
Matt Heon: Yeah, science about right to me.
Brent Baude: yes, of course, Stephen
Stevan Le Meur: you yeah, wanted to ask if you if you are looking for people who want to test, the the work on the I Native I advisors If you are seeking for, for more testers from the community here, I'm not yet.
Brent Baude: I will but not yet on the hyper V side.
Stevan Le Meur:  Okay.
Brent Baude:  We need we need ignition upstream to merge, and start creating some images. I could do one offs, but it's not something I like to do. The second piece is the
Brent Baude:  socket mapping. For Hyper-V is not been completed.
Brent Baude:  So, it would make it. More difficult for people to actually use in that regard on the habitable. On the apple side, we're still working out. I'm actually sort of faking out ignition right now, and that's how I'm doing the testing. But we're we're basically saying thing there, no socket mapping yet and we need mission to Merge when it works done.
Brent Baude:  And I'm going fishing next week, so it won't be in the next week.
Tom Sweeney: Don't catch any Celtics, please.
00:50:00
Tom Sweeney:  All right, that's it for our plan topics. We have just a few minutes left for open form. Questions, does anybody have any questions or comments? They want to make
Brent Baude: We love to hear what we're not doing, right?
Tom Sweeney:  yes. And also any topics that you'd like to see for the next meeting. Which I'll just say real quickly. Our next meeting is August 1st 2023. That's a Tuesday. That's first Tuesday of August, that'll be at 11:00 am again in our next ball. Meetings back up on me because you do that on the third floor you stay at the month and that's on the 15th this time around. So that'll be next Thursday. So, if you have any topics for either of those, let me know currently the quality demo will be on that list for the community meeting New August.
Tom Sweeney: I'm not hearing any other questions comments.
Stevan Le Meur: Comments. I think it's super cool. Everything that is happening in the Comet Padman community at the moment. So thanks everyone for your engagement involvement.
Tom Sweeney: All this.
Stevan Le Meur: It's amazing.
Tom Sweeney:  this, it's been
Gerry Seidman: actually, if I can at the 11th hour, ask questions, I actually met with Ben…
Tom Sweeney:  there.
Gerry Seidman: At Red Hat Summit and he's very aware of this stuff we're doing with a major financial that very much wants ALS if you would be ultimate layer storage. kind of,
Gerry Seidman: Whatever dancing. Just I presented the group on it, I won't be able to, I don't know if I'll put on the 15th, but what's one after the 15th, what the meeting date after the 15th?
Tom Sweeney: um, the one is there's Department of Community meeting on August 1st with this. Another one, another Cabal meeting. And if I can get my calendar up, I tell you, it's the third Thursday, in July. You don't?
Gerry Seidman: Right. Well, I'll reach out to you, then send an email between you and I, I'll follow up on that. Um, really…
Tom Sweeney: Okay.
Gerry Seidman: what I would, what my curiosity is, is right now. The ALF is considered experimental and storage in the container storage. Any suggestions on decide what the things I talked with Dan about about, Moving it forward to. Not being experimental.
Gerry Seidman: Like documentation. Things like that.
Tom Sweeney: Right? Can I throw that one in your life?
Brent Baude: Yeah, I was just waiting to see if anyone piped up. So Gerry you're the one then.
Gerry Seidman: I'm the one if you've heard about the people thinking about it. Yeah.
Brent Baude:  I heard about him.
Brent Baude:  I guess for content. I'd have to think about that. It's an interesting question. What is I'm not deeply familiar with what's held it back? Other than the fact that it's fairly new, but not a new technology, but a new ad.
Gerry Seidman: Yeah, it's it's it's deployed, it works. In the, you know, it's it's Dan suggested Da edit, you know, submitting some documentation. The only place I could imagine to document that is in the Storage.com. Man Page because nothing, there's no commands associated with it. Maybe you have some other thoughts in that. I've written that up. I just haven't submitted it yet. um, It works.
Brent Baude: Okay.
Gerry Seidman: Um, it's really just a matter of fear of commitment.
Gerry Seidman:  because, Other than myself, a group of NT.
Gerry Seidman:  And then some other miscellaneous projects, I don't think anybody, I don't know how many people using it.
Brent Baude: let me, let me get back to you, but I wondered if there were You said there was documentation and container storage.
Gerry Seidman: Now there's there is not, I I wrote some up that I can submit and…
Brent Baude:  Oh, okay. Okay.
Gerry Seidman: it really just I mean if you the other technology is the, you know, the alternate image store and that literally has two lines of documentation. I wrote A couple of paragraphs, which is probably too much but
Brent Baude: Well regardless that would be good to have.
Brent Baude:  I think, beginning the blog about it would be smart it and we can provide a blogging resource if you're interested.
Gerry Seidman:  Yeah, that's good to that but if you do you have my cut contact information?
Brent Baude:  Yeah, it's in the calendar notice, I would assume.
Gerry Seidman:  okay, so I don't have your contact information, so if you could ping me out response, thank you.
Brent Baude:  Absolutely.
00:55:00
Tom Sweeney: Right. Folks, unless there's any last questions. We're almost a time for this meeting. I'd like to very much thank all the presenters today for coming in and showing off the substance of fascinating. Look for a lot of things today. And again, we'll be meeting next on August 1st and then on July 20th. June 15th and July 20th. But I'm gonna stop the recording.
Tom Sweeney: And anybody wants to say anything and not be recorded. Otherwise, let's go to lunch.
Stevan Le Meur: Boost.
Gerry Seidman: In 30 days.
Tom Sweeney: All right, folks. Have a great day. Thanks so much.
Meeting ended after 00:56:17 👋
```
