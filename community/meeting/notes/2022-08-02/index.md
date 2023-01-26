# Podman Community Meeting
## August 2, 2022 11:00 a.m. Eastern (UTC-5)

### Attendees ( total)
Tom Sweeney, Chris Evich, Ashley Cui, Valentin Rothberg, Paul Holzinger, Nalin Dahyabhai, Giuseppe Scrivano, Preethi Thomas, Lokesh Mandvekar, Niall Crowe, Charlie Doern, Dan Walsh, Jake Correnti, Aditya Rajan, Karthik Elango, Mark Russell, Miloslav Trmac, Stevan Le Meur, Sally O'Malley, Ryan Cook, Urvashi Mohnani, Mohan Boddu, Florent Benoit, Martin Jackson, Mohan Bodu, Stephen Adams, Joseph Sawaya

## Meeting Start: 11:02 a.m. EST
### BlueJeans [Recording](https://youtu.be/Ee-boJpjSvA)

## Fetchit Demo
### Sally O'Malley/Ryan Cook
#### (1:40 in the video)

(Slides)[./Fetchit_demo.pdf]

Fetchit allows managing container deployments at scale.  The repo is [here](https://github.com/containers/fetchit)

 * GitOps driven deployment
 * Host interacts directly with Git rather than through an intermediary
 * Podman Go bindings
 * Not Kubernetes dependent
 * Lift and shift hardware

Podman's Go bindings helped a lot in creating containers and doing related operations.

How does Fetchit Happen?
  * Pull in git/image assets
  * Cron based scheduling
  * Podman socket
  * Dynamic reload of Fetchit configuration

The Podman socket allows for either root or user access.

Fetchit helps to solve resource-constrained environments.

Fetchit runs in a Podman container, can run systemd, ansible, filetransfer, and other options.

Configuration reload allows to reload the configuration and uses Podman's prune command to clean up cruft.

What's next for Fetchit?
  * GitSign to verify commits
  * Image verification cosign or similar solution
  * Ansible-pull

Dan noted that sigstore functionality will be baked into Podman v4.2 and Fetchit should be able to used it for signature verification.

Demos (12:40 in the video)
  * Scale up
  * Podman Kube + Clean up
  * Podman systemd

Showed the Fetchit config file, launched an RHEL 8 instance on Amazon, and kept it tiny.  Added Podman install instructions and launched 10 instances at once.  All systems up, and no touching necessary from Ryan.  This runs the commands on each node, and they go to the git location to get their instructions.

Sally then demo'd running Fetchit as a user server as non-root.  It showed the containers spinning up, doing their work, and then cleaning themselves up afterward.  

The second demo is for the fetchit kube play method.  It looks for a Yaml file in a Git repo, and Fetchit will grab them.  It created containers and pods and started up Nginx.  After prune runs, the images will be cleaned up.

They need to be careful to not reinvent Kubernets or Ansible.

## Moving pods and containers to Kubernetes cluster with 'podman kube apply'
### Urvashi Mohnani
#### (27:38 in the video)

New command `podman kube apply`.    Currently, there's a `podman kube generate` command that lets you create your kube yaml based on your pods, containers, etc.  The apply command enables you to deploy a kube yaml to a Kubernetes cluster when a kubeconfig file is given.

Urvashi then showed how it all worked in the demo.

Demo (28:20 in the video)

Generated kube mypod and the did `podman kube apply`

Created a new namespace and generated a new service file and applied it.  She then showed the services, and it showed the pod was created.

Kubeconfig file can hold info for multiple clusters.  

## Podman Desktop Updates
### Florent Benoit & Stevan Le Meur
#### (37:10 in the video)


Podman Desktop latest new features:
- Onboarding sequence (home page), detects if podman runs and ability to start it
- Registry Support
- Proxy configuration
- Revamped UI for containers and images
- Windows: Install of podman + Podman Desktop
- Help page

0.0.6 will be released along with Podman 4.2
Demo video: https://www.youtube.com/watch?v=br8b6DUHpD8 

Demo (40:10 in the video)

Early Adopter Program:
Asking users to join the early adopter program, which is linked from the top of podman-desktop.io web page. Especially looking for users interesting into providing feedback and getting involved on shaping up the tool. 

Links:
- github.com/containers/podman-desktop
- podman-desktop.io 


## Open Forum/Questions?
#### (47:35 in the video)

 1) Protections on prune in Fetchit?  If you're worried about losing, you can run in an drun manually instead.  The 'podman prune' does images not volume.  Fetchit would only prune a volume if not images/containers used it.
 2) 4.2 rc3 going out soon, v4.2 on Fedora on Aug 15.

## Topics for Next Meeting

1) Podman on Mac installer.


## Next Meeting: Tuesday, October 4, 2022, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday, September 15, 2022, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:54 a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:
```
Me10:57 AM
Please sign in here: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me11:00 AM
Please sign in here: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me11:02 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Valentin Rothberg11:02 AM
Good to see you Sally and Ryan!
Mark Russell11:04 AM
yay Fetchit!
Adi11:19 AM
@ryan: So cool. Is the process running cron which checks for consistency with repo running on each instance or just running on the controlling host ?
Daniel (rhatdan) Walsh11:20 AM
It is running on each node. There is no controlling node, all nodes are going to git location and getting their instructions.
Ryan Cook11:24 AM
Dan nailed it. All nodes operate independently
Adi11:26 AM
Ah i see nice !!! all nodes independent and git as single source of truth
Adi11:30 AM
@ryan: if kube is implemented is it under consideration to distribute replica of pods across nodes ? If yes I think a central API server would be needed
Sally O'Malley11:31 AM
we (fetchit) also closely watching this kube-apply - we'll be adding this function to fetchit - to combine w/ a minimal k8s env such as microshift
Miloslav Trmac11:40 AM
Either it’s a personal cluster, in which case the user has a kubeconfig, or it is an enterprise shared one, in which case login can get complex (OpenID via a browser) and we probably don’t want to deal with that.
Adi11:41 AM
@miloslav yes i meant the same
Preethi Thomas11:47 AM
lol
Adi11:49 AM
@miloslav: also if its prod or stage cluster the workload is directly moving from podman to cluster which might become issue
Ryan Cook11:54 AM
thank you all!
Stevan Le Meur11:54 AM
thanks all!
Florent Benoit11:55 AM
thanks, bye
Me11:55 AM
```
