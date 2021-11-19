# Podman Community Cabal Meeting Notes

Attendees: Tom Sweeney, Aditya Rajan, Matt Heon, Brent Baude, Ashley Cui, Preethi Thomas, Urvashi Mohnani, Eduardo Santiago, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Walsh, Máirín Duffy, Michael Scherer, Lokesh Mandvekar, Shion Tanaka, Jhon Honce, Valentin Rothberg, Ed Haynes, Jakub Dzon, James Cassel, Mairin Duffy, Michael Scherer, Scott McCarty, Shion Tanaka, Mehul Arora,

## November 18, 2021 Topics
1. Podman.io redesign - Máirín Duffy
2. Forwarding Play Kube HTTP API configmaps query parameter to the container engine - Urvashi Mohnani
3. Discuss Adding docker.io to unqualified image name - https://github.com/containers/podman/pull/12321

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=y9PxhYF-uNM)

Meeting start: 11:03 a.m. EST Thursday, November 18, 2021

### Podman.io redesign ( 0:52 in video) 
At this link, use the dropdown in the upper left corner to page through the mockups (they aren't hooked up to be click-thru yet):
https://design.penpot.app/#/view/c1192050-2619-11ec-bdd0-f35c6ae458e9?page-id=c1192051-2619-11ec-bdd0-f35c6ae458e9&index=0&share-id=554e5be0-2b66-11ec-91a7-f08c5eccf3df

(This is using Penpot.app, an open-source UX tool.)

GTK as an example site.   The main page redesign from some of Dan's talks and wondering to herself why would I want to use Podman?  Prominent link to the docs, to GitHub, and more.  The front page has the focus on "Give it a try".  Then additional links to blogs and coloring books.

Looking for help on how the other tools tie together on the front page.

Leaning toward GitHub pages using AsciiDoc with Jekyll. Might be able to use AsciiDoc to update contributing doc across projects.  So you can pull sections from another project perhaps.  This is a new process she's still working through.

Showed the community page too, including Code of Conduct, chat, meeting mailing lists.  Javascript to show the time zones of the maintainers would be nice.  At the bottom, showed how to submit pull requests.

Then she showed the Feature page, showing basic first steps.  Getting Started, community page, find a page on the site similar to the one in GitHub.

Shows features of cockpit UI, blog posts, and coloring book.

Another page for folks just starting with Podman

We might want to add pages for Mac, Windows, and how to use Podman on it.

### Forwarding Play Kube HTTP API  ( 24:45 in video)
PR in question: https://github.com/containers/podman/pull/12243

YAML is not getting cast correctly when sent.  Jakub is wondering if the solution proposed to use a configmap is OK per the community.  Paul asked how we should send the content to the server.  

Currently, it is a configmap that points to files, but Jakub would like to expand.

Jhon likes it better as GoLang and other bindings wouldn't have to jump through many hoops.  Brent thinks it's a reasonable approach along with Paul.  Jakub will pursue.

### Adding docker.io as default to image name (30:54 in video)

PR in question: https://github.com/containers/podman/pull/12321

Michael talked through the PR.  Basically, it will add "docker.io" if the image doesn't have any in it.  This will be the default, if fully qualified, docker.io wouldn't be added.

Docker does this and we're not fully compatible here.  The full discussion in the PR at: https://github.com/containers/podman/pull/12321#issuecomment-971412475

Dan thinks too many people have stumbled across this and doesn't think we should have to have them go to registry.conf to set their default.

Valentin doesn't think we'll ever be compatible with Docker here as we allow aliases for image names.  We also need to be compatible with atomic docker and it supports registries.  Third, if we change this, we'll break current behavior.  Fourth, a huge page to enforce docker.io due to the code structure in c/image.  Valentin thinks registries.conf changes are the way to go to address this.

Matt proposed that we should support the docker.io use case.  Docker on RHEL doesn't do this.  He's suggesting adding a flag in containers.conf to toggle this between adding and not adding docker.io to the image.  

Valentin warned this is likely to cause breaking changes in the code as changes in Buildah, Podman, Skopeo, c/image, and more.  

If we had "docker.io compat mode" in the system context, that would be the easiest way to get the info down, but it’s still not an insignificant amount of work.

What's the chance of getting Moby to change their behavior?  In the past, changes like that have been slow-moving.

Dan likes the flag idea, but Valentin is concerned that this will be a huge change for a simple idea.  

Dan is concerned that if we don't make the change, we'll get bad feedback from users.

We've made decisions in the past to not be compatible in this space.  

The consensus is that we want to do the right thing for the user, the hard part is figuring out the way to get this done.  How is unknown.  Brent doesn't want to implement something too large.

Matt doesn't think this will be as bad as Valentin believes.  However, build will probably "bad", but create might not be too bad.

The next step is to look at the compatibility library and see where the place is to do it.

#### Open discussion ( : in video)

1) None, we ran out of time.
 
### Next Meeting: Thursday December 16, 2021 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1.

Raw Meeting Chat:

```
Brent Baude11:01 AM
stepping away for a minute
You11:01 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Valentin Rothberg11:01 AM
@Dan: I muted you since you gave an echo
You11:02 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Lokesh Mandvekar11:07 AM
new site gonna rock
Christopher Evich11:08 AM
You matched the background water perspective to the icon perspective *wow*
Anders F Björklund11:08 AM
a common theme between the sites would be nice
i.e. linking podman and cri-o
Brent Baude11:09 AM
are we going to talk about our blogging problem/isssue ?
Michael Scherer11:10 AM
OSPO team can also provides openshift hosting, we have a cluster for community project, and so that's just a question of building one or more containers (we did it for project atomic, with 3 git repo combined)
You11:16 AM
https://www.youtube.com/channel/UCk8PKFfMXESWNXgGG5U_F_w
youtube channel ^^^
Lokesh Mandvekar11:16 AM
for IRC link..maybe we can just link to the libera's web ui  OR we could just redirect them to the matrix room, call me biased :)
Valentin Rothberg11:22 AM
A seal eating an apple :)
Urvashi Mohnani11:28 AM
https://github.com/containers/podman/pull/12243
Valentin Rothberg11:28 AM
Great work.  I am looking forward to see it in action :)
You11:29 AM
https://github.com/containers/podman/pull/12243
PR under discussion
Máirín Duffy11:29 AM
i'm gonna drop now but feel free to reach out any time w q's / feedback / ideas etc, I'm lurking in the podman matrix room o/
Michael Scherer11:34 AM
https://github.com/containers/podman/pull/12321
You11:34 AM
https://github.com/containers/podman/pull/12321
Michael Scherer11:36 AM
https://github.com/containers/podman/pull/12321#issuecomment-971412475 so that's the detail
Anders F Björklund11:42 AM
we have big problems with this in minikube, where we try to present a common API towards images from docker, cri-o (podman) and containerd (ctr and buildctl).
Unfortunately kubernetes has no global policy on how to specify images
Anders F Björklund11:45 AM
(also includes other things, like if image ID include a "sha256:" prefix or not)
Matt Heon11:47 AM
Small things like that, we should fix
No reason not to
re: sha256 prefix
Anders F Björklund11:54 AM
containerd is now making the full names more visible to people, if it is any consolation
Brent Baude11:54 AM
great! but the problem exists in what has historically been set and expected
Anders F Björklund11:54 AM
(when people change their kubernetes CRI, from docker/cri-docker over to containerd)
ieq-pxhy-jbh
```
