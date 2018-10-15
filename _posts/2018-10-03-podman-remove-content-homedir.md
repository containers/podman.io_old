---
title: Why can’t I delete storage files created by non-root podman?
layout: default
author: dwalsh
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Why can’t I delete storage files created by non-root Podman?
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

## Cool things you can do with Podman

When running [Podman](https://podman.io) as root, the default location for storage is /var/lib/containers/storage.  Of course, users cannot use this directory when running as non root, so Podman creates the storage by default in $HOME/.local/share/containers.

<!--readmore-->
When Podman creates this storage it is running inside of a user namespace and is allowed to create UIDs and GIDs based off the UID ranges stored in /etc/subuid and the GIDs listed in /etc/subgid.

For example my account has UID and GID ranges 100000 through 165535 reserved for it, as well as my UID and primary GID, 3267.

```
#grep dwalsh /etc/subuid
dwalsh:100000:65536
$ grep dwalsh /etc/subgid
dwalsh:100000:65536
```

When Podman starts a container as non root, by default, it maps my UID, 3267, to UID 0 inside of the container, then it maps 100,000->1,  100,001->2, 100,002->3 … 165,535->65536.

You can see this mapping inside of the container

```
$ podman run -ti fedora cat  /proc/self/uid_map
	 0       3267          1
	 1     100000     65536
$ podman run -ti fedora cat  /proc/self/gid_map
	 0       3267          1
	 1     100000     65536
```


Since I’m root in the container, I can create and set ownership of files inside of the container for using any UIDs and GIDs that are mapped into the container.

To see what happens, I will create a file and directory owned by a non root user inside of a container.
```
podman run -ti --name testfile fedora bash -c "mkdir /testdir; touch /testdir/testfile; chown -R 1:1 /testdir"
```
Since that was successful, let’s mount the container and see what it looks like from outside of the user namespace that’s used for running the container.

```
$ mnt=$(podman mount testfile)
$ echo $mnt
/home/dwalsh/.local/share/containers/storage/vfs/dir/691e874b6e1ba6807ecbe73910396b10f118617233aacc3df3297ffc4e1332f9
$ ls -l $mnt
total 4
lrwxrwxrwx.  1 dwalsh dwalsh    7 Feb  7  2018 bin -> usr/bin
dr-xr-xr-x.  2 dwalsh dwalsh    6 Feb  7  2018 boot
drwxr-xr-x.  2 dwalsh dwalsh    6 Apr 26 09:03 dev
drwxr-xr-x. 44 dwalsh dwalsh 4096 Apr 26 09:03 etc
drwxr-xr-x.  2 dwalsh dwalsh    6 Feb  7  2018 home
lrwxrwxrwx.  1 dwalsh dwalsh    7 Feb  7  2018 lib -> usr/lib
lrwxrwxrwx.  1 dwalsh dwalsh    9 Feb  7  2018 lib64 -> usr/lib64
drwx------.  2 dwalsh dwalsh    6 Apr 26 09:03 lost+found
drwxr-xr-x.  2 dwalsh dwalsh    6 Feb  7  2018 media
drwxr-xr-x.  2 dwalsh dwalsh    6 Feb  7  2018 mnt
drwxr-xr-x.  2 dwalsh dwalsh    6 Feb  7  2018 opt
drwxr-xr-x.  2 dwalsh dwalsh    6 Apr 26 09:03 proc
dr-xr-x---.  2 dwalsh dwalsh  162 Apr 26 09:03 root
drwxr-xr-x. 11 dwalsh dwalsh  169 Sep 25 09:11 run
lrwxrwxrwx.  1 dwalsh dwalsh    8 Feb  7  2018 sbin -> usr/sbin
drwxr-xr-x.  2 dwalsh dwalsh    6 Feb  7  2018 srv
drwxr-xr-x.  2 dwalsh dwalsh    6 Apr 26 09:03 sys
drwxr-xr-x.  2 100000 100000   22 Sep 25 13:38 testdir
drwxrwxrwt.  2 dwalsh dwalsh   32 Apr 26 09:03 tmp
drwxr-xr-x. 12 dwalsh dwalsh  144 Apr 26 09:03 usr
drwxr-xr-x. 19 dwalsh dwalsh  249 Apr 26 09:03 var
```
Notice the ownership of testdir and testfile.  The namespace that was used for running the container mapped UID 100000 from outside of the namespace to UID 1 inside of the namespace, and did the same for GID 100000, mapping it to GID 1 inside of the namespace.  When I set the ownership to UID and GID 1 from inside of the namespace, the corresponding values from outside of the namespace were what were recorded to disk.

```
$ ls -la $mnt/testdir
total 0
drwxr-xr-x.  2 100000 100000  22 Sep 25 13:38 .
drwxr-xr-x. 19 dwalsh dwalsh 257 Sep 25 13:38 ..
-rw-r--r--.  1 100000 100000   0 Sep 25 13:38 testfile
```
If i just try to clean up my directory I will get lots of errors.

```
rm -rf .local/share/containers/ 2>&1 | head -2
rm: cannot remove '.local/share/containers/storage/vfs/dir/891e1e4ef82ad02a4ea1f030831f942d722c7694c4db64ca3239c8163b811c58/bin': Permission denied
rm: cannot remove '.local/share/containers/storage/vfs/dir/891e1e4ef82ad02a4ea1f030831f942d722c7694c4db64ca3239c8163b811c58/boot': Permission denied
```
This is because this content was created from inside of a user namespace where I was UID 0, and because I was UID 0 in that namespace, I could set and change ownership of anything owned by any ID that was mapped into the namespace.  In this case, I assigned it an owner that wasn’t mapped to my own user.  Once I left the namespace, and I was back in the host namespace where I was just myself again, the contents belonged to the UID that I had mapped to 1 for the user namespace, which wasn’t my own UID.

Because of this, if I wanted to clean it all up, I could become root to remove the directory.  But if I don’t have root on the machine, what could I do?

### `Buildah unshare` or `rootlesskit  bash`

Well currently [Buildah](http://buildah.io) or [rootlesskit](https://github.com/rootless-containers/rootlesskit) can put you into the user namespace without launching a container and then you can remove the images.

```
$ buildah unshare
[root@localhost ~]# id
uid=0(root) gid=0(root) groups=0(root) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
```

I am now root inside of a namespace with the same mappings I’d use for a container, but everything else is the same.  In particular, I’m not using the container’s root filesystem.

```
[root@localhost ~]# pwd
/home/dwalsh
[root@localhost ~]# rm -rf .local/share/containers/
[root@localhost ~]#
```

### I am able to delete all the files in my homedir.
