# Podman Community Cabal Meeting Notes

Attendees: Matt Heon, Nalin Dahyabhai, Paul Holzinger, Lokesh Mandvekar, Valentin Rothberg, Eduardo Santiago, Giuseppe Scrivano, Aditya Rajan, Preethi Thomas, Ashley Cui, Brent Baude, Chris Evich, Urvashi Mohnani, Martin Jackson, Max Ehlers, Matthew McComas, Peter Buffon

## February 16, 2023 Topics

1. Podman Default Network: Enable DNS by default - Matt Heon
    

### Meeting Notes
Video [Recording](https://youtu.be/Rn8SKgubXQ4)

Meeting start: 11:02 a.m. Thursday, February 16, 2023

###  Podman Default Network: Enable DNS by default (0:57 in the video) - Matt Heon

We currently don't currently start DNS on the container by default.   So you can't talk to other containers by name.
    
The question is, going forward, should we turn it on by default?
    
Paul thinks the concern might be having a DNS server running on each container.
    
Brent thinks this will be a performance hit as another service will need to be run, and an up/down check will need to be run also.

Docker compose on Podman currently runs on a network without DNS, so we may need to adjust.  The "play kube" command may also need to be adjusted.

DNS is complex, and the more enablement you do, the more problems that can be encountered.  Brent is concerned.

Matt noted that only startup performance and shutdown performance that should be impacted the most.  Paul thinks there may be extra latency for the first request.
    
Valentin thinks we have had enough questions from customers asking why DNS doesn't work out of the gate, that it is worth looking into.

Matt noted that changing the default network will be pretty trivial. 

Giuseppe asked if there is a security concern with containers being able to use DNS.  Paul thinks that we're only providing name resolution, but it's not that much different than allowing for IP communication between containers.

Paul thinks we should do a study of the plusses and minuses of the change and then make a decision from there.  Regardless, we should make the selection process of the default network a be one-line change for ease of use.

Matt would like to do it as it's an advantage over what Docker does  He thinks it's a straight enhancement over Docker.

Matt is proposing having Netavark set as default DNS to on, while CNI would remain as not defaulting to DNS.

The question is, should this change, if it goes forward, go into a Podman 4.* release, or the Podman 5.0 release?  Is it a breaking change?  Paul leans towards 5.0.

Paul pointed out that we can't do this for CNI as it would break some functionality there.

The leaning is toward implementing this at Podman v5.0 and making it easily configurable.

Brent's concern is will the average user be able to update the conf file.  He thinks it's easy to do, but finding it is sometimes hard to locate.  Should we make it configurable from Podman itself?  We could do a network-update command in Podman, or allow the user to configure it via a Podman command.

Plumbing work to happen in the near future, final switch on Podman v5.0?

#### Open discussion (29:17 in the video)

1. Max asked about the WireGuard PR for Netavark.

[Netavark PR](https://github.com/containers/netavark/pull/472)

We had marked it as experimental.   Paul says he hasn't had the time to do a proper review due to the size and the lack of WireGuard experience.

Brent suggested that we might merge it, marking it as experimental, and then building some kind of gate around it.

Brent and Matt will review it and work to make it in.  Brent asked if Paul thought there was enough documentation surrounding it, especially pointers to WireGuard itself.
    
Many thanks to Max for his contribution.

### Next Meeting: Thursday, March 16, 2023, 11:00 a.m. EDT (UTC-5)
## Possible Topics
1.

### Next Community Meeting: Tuesday, April 4, 2023, 11:00 a.m. EDT (UTC-4)

### Possible Topics:


Meeting finished 11:40 a.m.

Raw Meeting Chat:

```
The raw chat was not captured.
```
