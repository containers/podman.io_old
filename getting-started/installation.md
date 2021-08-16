---
layout: default
title: Podman Installation
---

# Podman Installation Instructions

## Installing packaged versions of Podman

### MacOS

Podman is a tool for running Linux containers.  You can do this from a MacOS
desktop as long as you have access to a linux box either running inside of a
VM on the host, or available via the network.  You need to install the remote
client and then setup ssh connection information.

#### Remote Client
The Mac client is available through [Homebrew](https://brew.sh/):

```bash
brew install podman
```

### Windows

Podman is a tool for running Linux containers.  You can do this from a Windows
desktop as long as you have access to a linux box either running inside of a
VM on the host, or available via the network.  You need to install the remote
client and then setup ssh connection information in the podman-remote.conf
file.  Podman can also be run in the Windows Subsystem for Linux system, check
out the link below to see a description of how this is done.

#### Remote Client
  * [Latest remote client for Windows](https://github.com/containers/podman/releases/latest/download/podman-remote-release-windows.zip)

#### Windows Subsystem for Linux (WSL) 2.0
  * [How to run Podman on Windows with WSL2](https://www.redhat.com/sysadmin/podman-windows-wsl2)

### Linux Distributions

#### [Arch Linux](https://www.archlinux.org) & [Manjaro Linux](https://manjaro.org)

```bash
sudo pacman -S podman
```

If you have problems when running Podman in  [rootless](https://github.com/containers/podman/blob/main/README.md#rootless) mode follow the instructions [here](https://wiki.archlinux.org/index.php/Linux_Containers#Enable_support_to_run_unprivileged_containers_(optional))


#### [CentOS](https://www.centos.org)

Podman is available in the default Extras repos for CentOS 7 and in
the AppStream repo for CentOS 8 and Stream. Even though the available version often
lags behind the latest upstream release, it's still the preferable build for
production environments.

```bash
sudo yum -y install podman
```

The [Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:stable)
provides updated packages for CentOS 8 and Stream. These packages haven't
been through the official Red Hat QA process and may not be preferable for
production environments.

```bash
# CentOS 8
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_8/devel:kubic:libcontainers:stable.repo
# OPTIONAL FOR RUNC USERS: crun will be installed by default. Install runc first if you prefer runc
sudo dnf -y --refresh install runc
# Install Podman
sudo dnf -y --refresh install podman

# CentOS Stream
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_8_Stream/devel:kubic:libcontainers:stable.repo
# OPTIONAL FOR RUNC USERS: crun will be installed by default. Install runc first if you prefer runc
sudo dnf -y --refresh install runc
# Install Podman
sudo dnf -y --refresh install podman
```

NOTE:
1. CentOS 8 Kubic repo will continue to receive updates for Podman v3.0+ for the lifetime of CentOS 8 itself.
2. Users are recommended to switch to newer versions of CentOS to receive the most up to date versions of Podman.
3. CentOS Stream users are highly recommended to prefer packages from the
   default CentOS repos as they are often fairly current and are known to have
   passed RHEL's gating tests.


#### [Debian](https://debian.org)

The podman package is available in the Debian 11 (Bullseye) repositories and later.

```bash
sudo apt-get -y install podman
```

#### [Fedora](https://getfedora.org)

```bash
sudo dnf -y install podman
```

#### [Fedora-CoreOS](https://coreos.fedoraproject.org), [Fedora SilverBlue](https://silverblue.fedoraproject.org)

Built-in, no need to install

#### [Gentoo](https://www.gentoo.org)

```bash
sudo emerge app-emulation/podman
```

#### [OpenEmbedded](https://www.openembedded.org)

Bitbake recipes for Podman and its dependencies are available in the
[meta-virtualization layer](https://git.yoctoproject.org/cgit/cgit.cgi/meta-virtualization/).
Add the layer to your OpenEmbedded build environment and build Podman using:

```bash
bitbake podman
```

#### [openSUSE](https://www.opensuse.org)

```bash
sudo zypper install podman
```

#### [openSUSE Kubic](https://kubic.opensuse.org)

Built-in, no need to install

#### [Raspberry Pi OS arm64 (beta)](https://downloads.raspberrypi.org/raspios_arm64/images/)

Raspberry Pi OS use the standard Debian's repositories,
so it is fully compatible with Debian's arm64 repository.
You can simply follow the [steps for Debian](#debian) to install Podman.


#### [RHEL7](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux)

Subscribe, then enable Extras channel and install Podman.

```bash
sudo subscription-manager repos --enable=rhel-7-server-extras-rpms
sudo yum -y install podman
```

#### [RHEL8](https://developers.redhat.com/rhel8)

Podman is included in the `container-tools` module, along with Buildah and Skopeo. 

```bash
sudo yum module enable -y container-tools:rhel8
sudo yum module install -y container-tools:rhel8
```

The `container-tools:rhel8` is the fast application stream, containing most recent rolling versions of the tools. Use the `container-tools:2.0` stream for stable versions of Podman 1.6. The command `yum module list container-tools` shows the available streams.

#### [Ubuntu](https://www.ubuntu.com)

The podman package is available in the official repositories for Ubuntu 20.10
and newer.

```bash
# Ubuntu 20.10 and newer
sudo apt-get -y update
sudo apt-get -y install podman
```

If you would prefer newer (though not as well-tested) packages,
the [Kubic project](https://build.opensuse.org/package/show/devel:kubic:libcontainers:stable/podman)
provides packages for active Ubuntu releases 20.04 and newer (it should also work with direct derivatives like Pop!\_OS).
Checkout the [Kubic project page](https://build.opensuse.org/package/show/devel:kubic:libcontainers:stable/podman)
for a list of supported Ubuntu version and
architecture combinations. **NOTE:** The command `sudo apt-get -y upgrade`
maybe required in some cases if Podman cannot be installed without it.
The build sources for the Kubic packages can be found [here](https://gitlab.com/rhcontainerbot/podman/-/tree/debian/debian).

CAUTION: On Ubuntu 20.10 and newer, we highly recommend you use Buildah, Podman and Skopeo ONLY from EITHER the Kubic repo
OR the official Ubuntu repos. Mixing and matching may lead to unpredictable situations including installation conflicts.

```bash
. /etc/os-release
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L "https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/Release.key" | sudo apt-key add -
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get -y install podman
```

### Installing development versions of Podman

#### [CentOS](https://www.centos.org)

Podman is available in the AppStream repo for CentOS 8 and Stream, and these are also the preferred choice for use in production environments. However, the available version may be older than the upstream release.

The [Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:testing)
provides updated packages for CentOS 8 and Stream. These are not as
well-tested as the official CentOS packages, so tread with caution.

```bash
# CentOS 8
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:testing.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/CentOS_8/devel:kubic:libcontainers:testing.repo
# OPTIONAL FOR RUNC USERS: crun will be installed by default. Install runc first if you prefer runc
sudo dnf -y --refresh install runc
# Install Podman
sudo dnf -y --refresh install podman

# CentOS Stream
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:testing.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/CentOS_8_Stream/devel:kubic:libcontainers:testing.repo
# OPTIONAL FOR RUNC USERS: crun will be installed by default. Install runc first if you prefer runc
sudo dnf -y --refresh install runc
# Install Podman
sudo dnf -y --refresh install podman
```

#### [Fedora](https://getfedora.org)

You can test the very latest Podman in Fedora's `updates-testing`
repository before it goes out to all Fedora users.

```console
sudo dnf update --refresh --enablerepo=updates-testing podman
```

If you use a newer Podman package from Fedora's `updates-testing`, we would
appreciate your `+1` feedback in [Bodhi, Fedora's update management
system](https://bodhi.fedoraproject.org/updates/?packages=podman).


#### Ubuntu

The Kubic project provides RC/testing packages for Ubuntu 20.04 and 20.10.
Checkout the [Kubic project page](https://build.opensuse.org/package/show/devel:kubic:libcontainers:testing/podman)
for a list of supported Ubuntu version and
architecture combinations. **NOTE:** The `sudo apt-get -y upgrade`
maybe required in some cases if Podman cannot be installed without it.

NOTE: On Ubuntu 20.10 and newer, we highly recommend you use Buildah, Podman and Skopeo ONLY from EITHER the Kubic repo
OR the official Ubuntu repos. Mixing and matching may lead to unpredictable situations including installation conflicts.

```bash
. /etc/os-release
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:testing.list
curl -L "https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/xUbuntu_${VERSION_ID}/Release.key" | sudo apt-key add -
sudo apt-get update -qq
sudo apt-get -qq -y install podman
```

## Building from scratch

### Build and Run Dependencies

**Required**

Fedora, CentOS, RHEL, and related distributions you should try to run
`make package-install` which will install dependencies, build the source,
produce rpms for the current platform and install them in the end.

```bash
sudo yum install -y \
  btrfs-progs-devel \
  conmon \
  containernetworking-plugins \
  containers-common \
  crun \
  device-mapper-devel \
  git \
  glib2-devel \
  glibc-devel \
  glibc-static \
  go \
  golang-github-cpuguy83-md2man \
  gpgme-devel \
  iptables \
  libassuan-devel \
  libgpg-error-devel \
  libseccomp-devel \
  libselinux-devel \
  make \
  pkgconfig
```

Debian, Ubuntu, and related distributions:

```bash
sudo apt-get install \
  btrfs-progs \
  git \
  golang-go \
  go-md2man \
  iptables \
  libassuan-dev \
  libbtrfs-dev \
  libc6-dev \
  libdevmapper-dev \
  libglib2.0-dev \
  libgpgme-dev \
  libgpg-error-dev \
  libprotobuf-dev \
  libprotobuf-c-dev \
  libseccomp-dev \
  libselinux1-dev \
  libsystemd-dev \
  pkg-config \
  runc \
  uidmap
```

On openSUSE Leap 15.x and Tumbleweed:

```bash
sudo zypper -n in libseccomp-devel libgpgme-devel
```

On Manjaro (and maybe other Linux distributions):

Make sure that the Linux kernel supports user namespaces:

```
> zgrep CONFIG_USER_NS /proc/config.gz
CONFIG_USER_NS=y

```

If not, please update the kernel.
For Manjaro Linux the instructions can be found here:
https://wiki.manjaro.org/index.php/Manjaro_Kernels

After that enable user namespaces:

```
sudo sysctl kernel.unprivileged_userns_clone=1
```

To enable the user namespaces permanently:

```
echo 'kernel.unprivileged_userns_clone=1' > /etc/sysctl.d/userns.conf
```

### Building missing dependencies

If any dependencies cannot be installed or are not sufficiently current, they have to be built from source.
This will mainly affect Debian, Ubuntu, and related distributions, or RHEL where no subscription is active (e.g. Cloud VMs).

#### golang

Be careful to double-check that the version of golang is new enough (i.e. `go version`), version 1.12.x or higher is supported.
If needed, golang kits are available at https://golang.org/dl/. Alternatively, go can be built from source as follows
(it's helpful to leave the system-go installed, to avoid having to [bootstrap go](https://golang.org/doc/install/source):

```bash
export GOPATH=~/go
git clone https://go.googlesource.com/go $GOPATH
cd $GOPATH
git checkout tags/go1.12.17  # optional
cd src
./all.bash
export PATH=$GOPATH/bin:$PATH
```

#### conmon

The latest version of `conmon` is expected to be installed on the system. Conmon is used to monitor OCI Runtimes.
To build from source, use the following:

```bash
git clone https://github.com/containers/conmon
cd conmon
export GOCACHE="$(mktemp -d)"
make
sudo make podman
```

#### runc

The latest version of `runc` is expected to be installed on the system. It is picked up as the default runtime by Podman.
Version 1.0.0-rc4 is the minimal requirement, which is available in Ubuntu 18.04 already.
To double-check, `runc --version` should produce at least `spec: 1.0.1`, otherwise build your own:

```bash
git clone https://github.com/opencontainers/runc.git $GOPATH/src/github.com/opencontainers/runc
cd $GOPATH/src/github.com/opencontainers/runc
make BUILDTAGS="selinux seccomp"
sudo cp runc /usr/bin/runc
```

#### CNI plugins

#### Setup CNI networking

A proper description of setting up CNI networking is given in the [`cni` README](https://github.com/containers/podman/blob/main/cni/README.md).

A basic setup for CNI networking is done by default during the installation or make processes and
no further configuration is needed to start using Podman.

#### Add configuration

```bash
sudo mkdir -p /etc/containers
sudo curl -L -o /etc/containers/registries.conf https://src.fedoraproject.org/rpms/containers-common/raw/main/f/registries.conf
sudo curl -L -o /etc/containers/policy.json https://src.fedoraproject.org/rpms/containers-common/raw/main/f/default-policy.json
```


#### Optional packages

Fedora, CentOS, RHEL, and related distributions:

(no optional packages)

Debian, Ubuntu, and related distributions:

```bash
apt-get install -y \
  libapparmor-dev
```

### Get Source Code

First, ensure that the `go version` that is found first on the $PATH is higher than 1.12.x.  Instruction [above](#golang) will help you compile newer version of Go if needed.  Then we can build Podman:

```bash
git clone https://github.com/containers/podman/
cd podman
make BUILDTAGS="selinux seccomp"
sudo make install PREFIX=/usr
```

#### Build Tags

Otherwise, if you do not want to build Podman with seccomp or selinux support you can add `BUILDTAGS=""` when running make.

```bash
make BUILDTAGS=""
sudo make install
```

Podman supports optional build tags for compiling support of various features.
To add build tags to the make option the `BUILDTAGS` variable must be set, for example:

```bash
make BUILDTAGS='seccomp apparmor'
```

| Build Tag                        | Feature                            | Dependency           |
|----------------------------------|------------------------------------|----------------------|
| apparmor                         | apparmor support                   | libapparmor          |
| exclude_graphdriver_btrfs        | exclude btrfs                      | libbtrfs             |
| exclude_graphdriver_devicemapper | exclude device-mapper              | libdm                |
| libdm_no_deferred_remove         | exclude deferred removal in libdm  | libdm                |
| seccomp                          | syscall filtering                  | libseccomp           |
| selinux                          | selinux process and mount labeling |                      |
| systemd                          | journald logging                   | libsystemd           |

Note that Podman does not officially support device-mapper. Thus, the `exclude_graphdriver_devicemapper` tag is mandatory.

### Vendoring - Dependency Management

This project is using [go modules](https://github.com/golang/go/wiki/Modules) for dependency management.  If the CI is complaining about a pull request leaving behind an unclean state, it is very likely right about it.  After changing dependencies, make sure to run `make vendor` to synchronize the code with the go module and repopulate the `./vendor` directory.

### Static build

It is possible to build a statically linked binary of Podman by using
the officially provided
[nix](https://nixos.org/nixos/packages.html?attr=podman-unwrapped&channel=nixpkgs-unstable&query=podman)
package and the derivation of it [within this repository](nix/). The
builds are completely reproducible and will create a x86\_64/amd64
stripped ELF binary for [glibc](https://www.gnu.org/software/libc).

#### Nix

To build the binaries by locally installing the nix package manager:

``` shell
curl -L https://nixos.org/nix/install | sh
git clone https://github.com/containers/podman.git && cd podman
nix build -f nix/
./result/bin/podman --version
```

#### Ansible

An [Ansible Role](https://github.com/alvistack/ansible-role-podman) is
also available to automate the installation of the above statically
linked binary on its supported OS:

``` bash
sudo su -
mkdir -p ~/.ansible/roles
cd ~/.ansible/roles
git clone https://github.com/alvistack/ansible-role-podman.git podman
cd ~/.ansible/roles/podman
pip3 install --upgrade --ignore-installed --requirement requirements.txt
molecule converge
molecule verify
```

## Configuration files

### [registries.conf](https://src.fedoraproject.org/rpms/containers-common/blob/main/f/registries.conf)

#### Man Page: [registries.conf.5](https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md)

`/etc/containers/registries.conf`

registries.conf is the configuration file which specifies which container registries should be consulted when completing image names which do not include a registry or domain portion.

#### Example from the Fedora `containers-common` package

```
$ cat /etc/containers/registries.conf
# For more information on this configuration file, see containers-registries.conf(5).
#
# NOTE: RISK OF USING UNQUALIFIED IMAGE NAMES
# We recommend always using fully qualified image names including the registry
# server (full dns name), namespace, image name, and tag
# (e.g., registry.redhat.io/ubi8/ubi:latest). Pulling by digest (i.e.,
# quay.io/repository/name@digest) further eliminates the ambiguity of tags.
# When using short names, there is always an inherent risk that the image being
# pulled could be spoofed. For example, a user wants to pull an image named
# `foobar` from a registry and expects it to come from myregistry.com. If
# myregistry.com is not first in the search list, an attacker could place a
# different `foobar` image at a registry earlier in the search list. The user
# would accidentally pull and run the attacker's image and code rather than the
# intended content. We recommend only adding registries which are completely
# trusted (i.e., registries which don't allow unknown or anonymous users to
# create accounts with arbitrary names). This will prevent an image from being
# spoofed, squatted or otherwise made insecure.  If it is necessary to use one
# of these registries, it should be added at the end of the list.
#
# # An array of host[:port] registries to try when pulling an unqualified image, in order.
unqualified-search-registries = ["registry.fedoraproject.org", "registry.access.redhat.com", "docker.io"]
#
# [[registry]]
# # The "prefix" field is used to choose the relevant [[registry]] TOML table;
# # (only) the TOML table with the longest match for the input image name
# # (taking into account namespace/repo/tag/digest separators) is used.
# #
# # If the prefix field is missing, it defaults to be the same as the "location" field.
# prefix = "example.com/foo"
#
# # If true, unencrypted HTTP as well as TLS connections with untrusted
# # certificates are allowed.
# insecure = false
#
# # If true, pulling images with matching names is forbidden.
# blocked = false
#
# # The physical location of the "prefix"-rooted namespace.
# #
# # By default, this equal to "prefix" (in which case "prefix" can be omitted
# # and the [[registry]] TOML table can only specify "location").
# #
# # Example: Given
# #   prefix = "example.com/foo"
# #   location = "internal-registry-for-example.net/bar"
# # requests for the image example.com/foo/myimage:latest will actually work with the
# # internal-registry-for-example.net/bar/myimage:latest image.
# location = internal-registry-for-example.com/bar"
#
# # (Possibly-partial) mirrors for the "prefix"-rooted namespace.
# #
# # The mirrors are attempted in the specified order; the first one that can be
# # contacted and contains the image will be used (and if none of the mirrors contains the image,
# # the primary location specified by the "registry.location" field, or using the unmodified
# # user-specified reference, is tried last).
# #
# # Each TOML table in the "mirror" array can contain the following fields, with the same semantics
# # as if specified in the [[registry]] TOML table directly:
# # - location
# # - insecure
# [[registry.mirror]]
# location = "example-mirror-0.local/mirror-for-foo"
# [[registry.mirror]]
# location = "example-mirror-1.local/mirrors/foo"
# insecure = true
# # Given the above, a pull of example.com/foo/image:latest will try:
# # 1. example-mirror-0.local/mirror-for-foo/image:latest
# # 2. example-mirror-1.local/mirrors/foo/image:latest
# # 3. internal-registry-for-example.net/bar/image:latest
# # in order, and use the first one that exists.
#
# short-name-mode="enforcing"

[[registry]]
location="localhost:5000"
insecure=true
```

### [mounts.conf](https://src.fedoraproject.org/rpms/containers-common/blob/main/f/mounts.conf)

`/usr/share/containers/mounts.conf` and optionally `/etc/containers/mounts.conf`

The mounts.conf files specify volume mount directories that are automatically mounted inside containers when executing the `podman run` or `podman build` commands.  Container process can then use this content.  The volume mount content does not get committed to the final image.

Usually these directories are used for passing secrets or credentials required by the package software to access remote package repositories.

For example, a mounts.conf with the line "`/usr/share/rhel/secrets:/run/secrets`", the content of `/usr/share/rhel/secrets` directory is mounted on `/run/secrets` inside the container.  This mountpoint allows Red Hat Enterprise Linux subscriptions from the host to be used within the container.

Note this is not a volume mount. The content of the volumes is copied into container storage, not bind mounted directly from the host.

#### Example from the Fedora `containers-common` package:

```
cat /usr/share/containers/mounts.conf
/usr/share/rhel/secrets:/run/secrets
```

### [seccomp.json](https://src.fedoraproject.org/rpms/containers-common/blob/main/f/seccomp.json)

`/usr/share/containers/seccomp.json`

seccomp.json contains the whitelist of seccomp rules to be allowed inside of
containers.  This file is usually provided by the containers-common package.

The link above takes you to the seccomp.json

### [policy.json](https://src.fedoraproject.org/rpms/containers-common/blob/main/f/default-policy.json)

`/etc/containers/policy.json`

#### Man Page: [policy.json.5](https://github.com/containers/image/blob/main/docs/containers-policy.json.5.md)


#### Example from the Fedora `containers-common` package:

```
cat /etc/containers/policy.json
{
    "default": [
        {
            "type": "insecureAcceptAnything"
        }
    ],
    "transports":
        {
            "docker-daemon":
                {
                    "": [{"type":"insecureAcceptAnything"}]
                }
        }
}
```
