# Podman Community Meeting
## April 6, 2021 8:00 p.m. Eastern (UTC-4)

### Attendees (18 total)
Tom Sweeney, Brent Baude, Jhon Honce, Dan Walsh, Chris Evich, Lokesh Mandvekar, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Matt Heon, Ashley Cui, Sumantro Mukherjee, Scott McCarty, Shion Tanaka, Juanje Ojeda, Edward Shen, Reinhard Tartler

## Meeting Start: 8:00 p.m.
### BlueJeans [Recording](https://bluejeans.com/s/@f3vA2PsK7a)


## Podman Commit Topic Standards
### Matt Heon
#### (2:17 in the video)

If you're fixing a bug or an issue, please include a link to the commit message or at least in a comment.


##  Podman v3.1 Preview
### Matt Heon
#### (3:00 in the video)

Matt pulled up the release notes (https://github.com/containers/podman/blob/main/RELEASE_NOTES.md).  Matt likes to get rleases out every 6 to 8 weeks

Added secrets, although not with crypto, manifest commands and prune have been added.  The Podman copy command has been reworked heavily by Valentin Rothberg.  Now you can copy to directories too now.  You should now be able to copy anywhere in a container.

Also added U option for mounting volumes.

Matt then went over a number of bugs/issues about 50, with many fixes from the community and a small CVE.

More significant work in the next release coming up in 

## U volume flag to chown source volumes
### Eduardo Vega
#### (6:58 in the video)

[slides](https://github.com/containers/podman.io/blob/main/community/meeting/notes/2021-04-06/Podman-U-Volume-Opt-06_04_2021.pptx)

New Volume option.   
 * Podman create and Podman run with --volume.
 * "U" uppercase letter is the new option
 * Changes ownership of source volumes on the host.
   * Based on the container owners uid and gid and maps those to th host.
   * The container and the volume will have the same owners

##### Demo (8:30 in the video)

podman run -it -v /tmp/data01:/data:Z --user 998:998 fedora sh

This showed that the wrong user (root) owned directories in the container.

Now with 'U' added to the volume specification.

podman run -it -v /tmp/data01:/data:Z,U --user 998:998 fedora sh

The directory and files are now owned by 998.

This can also be run with tmpfs volumes

podman run -it --rm --tmpfs /data:Z,U --user 998:998 fedora ls -la data

This also shows the directory has the right permissions.  Ditto overlayfs.

Dan talked about some other use cases.
  * Usefull when running mariadb in a container, you could volume mount /var/lib/mariadb for it with the correct permissions.
  * It's super useful for a rootless user in the usernamespace.
  * It's a really great and powerful feature that people haven't disovered yet.

##  Podman on Mac Preview
### Brent Baude/Ashley Cui
#### (15:20 in the video)

Brent Baude led off.  Creating a Podman on Mac using a subcommand in pocman called "machine" building upon other efforts.  The code is very modular.  The initial implementation is Fedora CoreOS in the vm which is configurable.  

Testing on X86 linux on Mac OS X8664 and aarch64.

Current implementation relies on qemu which currently has some platform dependencies.  

Hurdle to resolve the networking on the VM and exposing services running in the container on the host.

Podman machine is upstream now and works, but no ability to expose services at this point.  But you can build images and experiment with how it works.

##### Demo (19:22 in the video)

Ashley did a demo running on her Mac.

Used the 
podman-remote machine --help command
podman-remote machine init # pulled fedora coreos image

podman-remote machine init anothername # creates with the specified name.

podman-remote machine ls # shows the machines create

When you init the vm, it creates connections automatically.

podman-remote machine start # starts the VM

podman-remote machine ssh podman-machine-default # sshinto the machine

podman-remote pull alpine #failed with socket issue being chased.

Ashely tried a number of pulls and it finally worked after a number of attempts and tweaking.

The container runs on the VM, but you type on the Mac.  It does work, but socket activation issues are being chased.

This is running on the Mac M1 now, and work in progress on Mac Intel based.

Questions on the systemd socket.  The socket issue is likely due to Podman talking to systemd.  Dan thinks it's fixed upstream in systemd.

The demo showed "podman-remote", but the final release will just be "podman".

The user experience should be you would just install "podman" and everything needed will come along with that.

Dan asked about install: goal user experience is 
 `brew install podman`,  `podman machine init`, `podman machine start`, and then you're running as if you're on a linux box.

## Questions?
#### (35:00) in the video)

1.  What about Podman on windows?  The current leaning is to use WSL2 probably Ubuntu.  It's being looked at and we'd love community help.
2.  Tshirts were recently available, but are not currently due to a vendoring problem.  ;^(
3.  For FCOS, does the machine pull stable every time?  It pulls the next stream and you can use a URL if you'd like.
4.  Will podman machine will work on a linux box?  Yes

## Topics for Next Meeting

## Next Meeting: Tuesday May 4, 2021, 11:00 a.m. Eastern (UTC-4)


### Meeting End: 8:43 p.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:

```
Me:7:57 PM
Please sign in at: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?both
Brent Baude8:00 PM
ok, had one flicker of the power from the storm here .... three flickers and we're out
Reinhard 'siretart' Tartler8:08 PM
FWIW, I've got the podman 3.1 package almost ready, will upload to debian/experimental later this week
Daniel (rhatdan) Walsh8:08 PM
Thanks
Brent Baude8:08 PM
outstanding
jhonce8:08 PM
@siretart Great!
Brent Baude8:09 PM
@siretart, maybe connect with us to make sure the latest libcap and crun are being used? we can explain.
perhaps stay a few minutes after and we can elaborate ?
Reinhard 'siretart' Tartler8:09 PM
sure thing!
Matt Heon8:13 PM
This is *very* useful for rootless user/group mapping issues. I'm writing a blog on this right now and am definitely mentioning this.
Brent Baude8:14 PM
++ mheon
Me:8:15 PM
Very nice!
Shion Tanaka8:18 PM
I'm interested in being able to run Podman on a Mac, since VS Code's Remote Containers feature is not available on Macs.
sumantrom8:31 PM
Awesome Presentation Asley, for FCOS, it pulls the latest stable everytime by default?
sumantrom8:32 PM
thanks!
Reinhard 'siretart' Tartler8:38 PM
I'd love to see podman working out of the box on wsl2 and macs (at dayjob, that's what the company provides)
awesome t-shirt. Where can I get one? :-)
Shion Tanaka8:38 PM
Thanks for the great demo!
Reinhard 'siretart' Tartler8:39 PM
+1 -- awesome!
debian and ubuntu, for that matter :-)
Reinhard 'siretart' Tartler8:41 PM
will do
thanks for organizing this meeting, amazing demos, really enjoyed them!
Ed8:42 PM
Great work, thanks!
Juanje Ojeda8:44 PM
Great meeting and demos. Thanks!
sumantrom8:44 PM
Thanks for organizing!

```
