# Podman Community Cabal Meeting Notes

Attendees: Tom Sweeney, Aditya Rajan, Matt Heon, Brent Baude, Ashley Cui, Chris Evich, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Walsh, Valentin Rothberg, Jhon Honce, Miloslav Trmač, Charlie Doern, Lokesh Mandvekar, Eduardo Santiago, Christian Felder, Flavian Missi, Lance Lovette, Martin Jackson, Oleg Bulatov, Preethi Thomas

## March 17, 2022 Topics
1. /etc/hosts in containers - Paul Holzinger
2. Mac OS Volume Mounts - Brent Baude
3. Podman pod create - Exit when containers exit? - Dan Walsh

### Meeting Notes
Video [Recording](https://youtu.be/wvENxqMjuLI)

Meeting start 11:02 a.m. Thursday March 17, 2022

### /etc/hosts in containers - (1:30 in video) - Paul Holzinger

Paul's document with questions/issues [here]()

We don't currently support network connect/disonnect with /etc/host getting updated.

If we generate an /etc/hosts in the container, we use the entries from the host if there are none in the container.

For slirp4netns we use the contaienr host name.

When we have several entries for the bridge network case, should we use the first, or all, or somehow pick/choose?  Matt thinks we should use all that don't have duplicates.  If we encounter a duplicate, we should take the first one found and ignore the rest.  So a user entry should trump all, and the rest should be in priority order.

For pods, you must add an entry for each container.  When the container is stopped, it has to remove this entry.

Make sure hosts.containers.internal is only added.   Matt asked if we could do something other than 127.0.0.1 for the localhost value.  Paul noted that's not the behavior some people expect.  So Paul thinks we could use the public IP of the container.

Dan noted that some people want a no-host option, in which case we'll use the values found in the image.

There's a potential information leak if we use the entries from the hosts /etc/hosts in the container as we'd add the host’s IP to the containers version of the file.

We should allow users to disable host.containers.internal in the containers.conf.

The problem Lance is running into is he's running many containers in the network.  He's hoping to configure the /etc/hosts in the container at run time rather than build time.  He wants to ensure that each container has a different IP for the same first name.  So the /etc/hosts should be different per container.

He'd like a way to have a different /etc/hosts file per container.  Issue on [GitHub](https://github.com/containers/aardvark-dns/issues/82).

Lance is seeing containers sharing the info.  We do that for containers in a shared network namespace or containers in a Pod.


### Mac OS Volume Mounts - (28:40 in video) - Brent Baude

Brent is working with Anders, and they're trying to get their heads around the feature.  Currently, if you need to add one, you need to remove your machine and add it, which is not optimal.

One thought was to add the user’s mount in macOS, so there'd be a direct path.  Like $HOME to $HOME.  This is what Docker is doing and Anders thinks this is what people expect.  It also allows for other mounts to be used.  You may need to reboot, but you don't have to delete the user.

It should be configurable in containers.conf so people can change it as wanted.

This should be in Podman v4.1 if things go right.

Lima is doing read-only by default.  Dan thinks we should add a `:ro` option that can be added to allow this functionality.

### Podman pod create - What happens when all containers stop... - (37:12 in the video) - Dan Walsh

An issue came up this week where someone was running a pod and when what they thought was the primary container exited, the pod continued running, and they didn't expect that.  Dan would like to see an option that would tell Podman what to do when a container exits that is running inside of a pod.

There are three possible options:
1. Ignore - the container exit (current default), the pod keeps running.
2. Close - if any container exits, then the pod exits
3. Restart - if the container exits, the pod would restart it.  Similar to systemd.  It should be overrideable per container.

Dan would like comments/thoughts?  A thought that the restart policy might not work in systemd.  Valentin thinks that if the last container exits, then the pod should as well.

Matt thinks we don't need the option, rather, we should just stop the pod when the last container stops, as Valentin noted.  We currently have the restart option for a container, so if someone wanted to ensure the pod stayed up, they could use that restart option.

Valentin thinks we need to allow a pod to start without containers and then add containers to it.  So we shouldn't stop the pod if it hasn't had a container inside of it.

On further reflection, Dan thinks the ignore might not be a useful case.  Dan thinks if we change the default to keep the pod up unless there are no longer any containers within, then we won't need to add the options.  Cleanup would need to change to verify that there aren't any containers running, and if not, then kill the pod.

Lance has noted catatonit orphans and wonders if this might be related.  Will post a bug if he can ID a pattern.

#### Open discussion (45:50 in video)

1.  Podman v4.0 updates. - Brent Baude
    Podman v4.0 has been going well, especially given the new content. We are now focusing on things that need to be added.  A number of CI, memory, and other internal to the build systems things to add in the near term.  That will be good as we'll be able to work on bugs as they arise.  The Red Hat team has a bug list max, and we just hit that, so we'll be focusing on that over the next week or two.  
    
    For features, work is ongoing for cosign.  Jhon will be working on Homebrew improvements.  Urvashi is working on a YAML to Kubernetes integration.  Matt is working on Docker compose v2. So far, that's going very well.   Also, a number of blog posts.
    
    The new features mentioned will be in v4.1 and v4.2.  Podman v4.1 will be out roughly in late April 2022.
    
    Virtio-fs is being worked on with qemu, which should then be useable on Planet 9 and mac.  This will allow multiple UIDs to be used on a Mac once complete.  That's probably a longer-term project.
    
    Work is ongoing within Red Hat for a Desktop](https://github.com/containers/desktop)


### Next Meeting: Thursday April 21, 2022 11:00 a.m. EDT (UTC-5)
### Next Community Meeting: Tuesday April 5, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. None

Meeting finished 11:56

Raw Meeting Chat:

```

Daniel Walsh
10:57 AM
https://www.redhat.com/sysadmin/podman-transfer-container-images-without-registry
You
11:00 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Lance Lovette
11:22 AM
https://github.com/containers/aardvark-dns/issues/82
Ashley Cui
11:54 AM
https://github.com/containers/desktop
```
