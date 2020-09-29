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

#### [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/)

The [Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:stable)
provides updated packages for CentOS 7 which can be used unmodified on Amazon Linux 2.

```bash
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_7/devel:kubic:libcontainers:stable.repo
sudo yum -y install yum-plugin-copr
sudo yum -y copr enable lsm5/container-selinux
sudo yum -y install podman
```


#### [Arch Linux](https://www.archlinux.org) & [Manjaro Linux](https://manjaro.org)

```bash
sudo pacman -S podman
```

If you have problems when running Podman in  [rootless](https://github.com/containers/podman/blob/master/README.md#rootless) mode follow the instructions [here](https://wiki.archlinux.org/index.php/Linux_Containers#Enable_support_to_run_unprivileged_containers_(optional))


#### [CentOS](https://www.centos.org)

Podman is available in the default Extras repos for CentOS 7 and in
the AppStream repo for CentOS 8 and Stream. Even though the available version often
lags behind the latest upstream release, it's still the preferable build for
production environments.

```bash
sudo yum -y install podman
```

The [Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:stable)
provides updated packages for CentOS 7, 8 and Stream. These packages haven't
been through the official Red Hat QA process and may not be preferable for
production environments.

```bash
# CentOS 7
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_7/devel:kubic:libcontainers:stable.repo
sudo yum -y install podman

# CentOS 8
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_8/devel:kubic:libcontainers:stable.repo
sudo dnf -y install podman

# CentOS Stream
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:stable.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/CentOS_8_Stream/devel:kubic:libcontainers:stable.repo
sudo dnf -y install podman
```


#### [Debian](https://debian.org)

The libpod package is available in
the [Bullseye (testing) branch](https://packages.debian.org/bullseye/podman), which
will be the next stable release (Debian 11). Alternatively, the
[Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:stable)
provides packages for Debian 10, testing and unstable; it will be more
frequently updated than the one in Debian official repository, due to how Debian
works.

```bash
# Debian Unstable/Sid
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_Unstable/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_Unstable/Release.key | sudo apt-key add -

# Debian Testing
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_Testing/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_Testing/Release.key | sudo apt-key add -

# Debian 10
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_10/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Debian_10/Release.key | sudo apt-key add -

sudo apt-get update -qq
sudo apt-get -qq -y install podman
```

There are many [packages](https://packages.debian.org/search?keywords=libpod&searchon=names&suite=stable&section=all)
with the libpod prefix available already on Debian. However, those are
unrelated to this project.


#### [Fedora](https://www.fedoraproject.org), [CentOS](https://www.centos.org)

```bash
sudo yum -y install podman
```

#### [Fedora-CoreOS](https://coreos.fedoraproject.org), [Fedora SilverBlue](https://silverblue.fedoraproject.org)

Built-in, no need to install

#### [Gentoo](https://www.gentoo.org)

```bash
sudo emerge app-emulation/libpod
```

#### [OpenEmbedded](https://www.openembedded.org)

Bitbake recipes for podman and its dependencies are available in the
[meta-virtualization layer](https://git.yoctoproject.org/cgit/cgit.cgi/meta-virtualization/).
Add the layer to your OpenEmbedded build environment and build podman using:

```bash
bitbake podman
```

#### [openSUSE](https://www.opensuse.org)

```bash
sudo zypper install podman
```

#### [openSUSE Kubic](https://kubic.opensuse.org)

Built-in, no need to install

#### [Raspbian](https://raspbian.org)

The Kubic project provides packages for Raspbian 10.
 
```bash
# Raspbian 10
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Raspbian_10/ /' | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/Raspbian_10/Release.key | sudo apt-key add -
sudo apt-get update -qq
sudo apt-get -qq -y install podman
```

#### [RHEL7](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux)

Subscribe, then enable Extras channel and install Podman.

```bash
sudo subscription-manager repos --enable=rhel-7-server-extras-rpms
sudo yum -y install podman
```

#### [RHEL8 Beta](https://www.redhat.com/en/blog/powering-its-future-while-preserving-present-introducing-red-hat-enterprise-linux-8-beta?intcmp=701f2000001Cz6OAAS)

```bash
sudo yum module enable -y container-tools:1.0
sudo yum module install -y container-tools:1.0
```

#### [Ubuntu](https://www.ubuntu.com)

The Kubic project provides packages for Ubuntu 18.04, 19.04, 19.10 and 20.04.
Checkout the [Kubic project page](https://build.opensuse.org/package/show/devel:kubic:libcontainers:stable/podman)
for a list of supported Ubuntu version and
architecture combinations. **NOTE:** The command `sudo apt-get -y upgrade`
maybe required in some cases if Podman cannot be installed without it.

```bash
. /etc/os-release
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:stable.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/xUbuntu_${VERSION_ID}/Release.key | sudo apt-key add -
sudo apt-get update
sudo apt-get -y upgrade 
sudo apt-get -y install podman
```

There are many [packages](https://packages.ubuntu.com/search?keywords=libpod&searchon=names&suite=eoan&section=all)
with the libpod prefix available already on Ubuntu. However, those are
unrelated to this project.

### Installing development versions of Podman

#### [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/)

The [Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:testing)
provides updated packages for CentOS 7 which can be used unmodified on Amazon Linux 2.

```bash
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:testing.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/CentOS_7/devel:kubic:libcontainers:testing.repo
sudo yum -y install yum-plugin-copr
sudo yum -y copr enable lsm5/container-selinux
sudo yum -y install podman
```

#### [CentOS](https://www.centos.org)

Podman is available in the default Extras repos for CentOS 7 and in
the AppStream repo for CentOS 8 and Stream, however the available version often
lags the upstream release.

The [Kubic project](https://build.opensuse.org/project/show/devel:kubic:libcontainers:testing)
provides updated packages for CentOS 7, 8 and Stream.

```bash
# CentOS 7
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:testing.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/CentOS_7/devel:kubic:libcontainers:testing.repo
sudo yum -y install podman

# CentOS 8
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:testing.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/CentOS_8/devel:kubic:libcontainers:testing.repo
sudo dnf -y install podman

# CentOS Stream
sudo dnf -y module disable container-tools
sudo dnf -y install 'dnf-command(copr)'
sudo dnf -y copr enable rhcontainerbot/container-selinux
sudo curl -L -o /etc/yum.repos.d/devel:kubic:libcontainers:testing.repo https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/CentOS_8_Stream/devel:kubic:libcontainers:testing.repo
sudo dnf -y install podman
```
#### Debian

The Kubic project provides RC/testing packages for Debian 10, testing and
unstable.

```bash
# Debian Unstable/Sid
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Debian_Unstable/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:testing.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Debian_Unstable/Release.key | sudo apt-key add -

# Debian Testing
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Debian_Testing/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:testing.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Debian_Testing/Release.key | sudo apt-key add -

# Debian 10
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Debian_10/ /' > /etc/apt/sources.list.d/devel:kubic:libcontainers:testing.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Debian_10/Release.key | sudo apt-key add -

sudo apt-get update -qq
sudo apt-get -qq -y install podman
```


#### Fedora

You can test the very latest Podman in Fedora's `updates-testing`
repository before it goes out to all Fedora users.

```console
sudo yum distro-sync --enablerepo=updates-testing podman
```

If you use a newer Podman package from Fedora's `updates-testing`, we would
appreciate your `+1` feedback in [Bodhi, Fedora's update management
system](https://bodhi.fedoraproject.org/updates/?packages=podman).

If you are running a non-rawhide Fedora distribution, you can also test the latest packages
with our [COPR repository](https://copr.fedorainfracloud.org/coprs/baude/Upstream_CRIO_Family/).


#### [Raspbian](https://raspbian.org)

The Kubic project provides RC/testing packages for Raspbian 10.

```bash
# Raspbian 10
echo 'deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Raspbian_10/ /' | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:testing.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/Raspbian_10/Release.key | sudo apt-key add -
sudo apt-get update -qq
sudo apt-get -qq -y install podman
```


#### Ubuntu

The Kubic project provides RC/testing packages for Ubuntu 18.04, 19.04, 19.10 and 20.04.
Checkout the [Kubic project page](https://build.opensuse.org/package/show/devel:kubic:libcontainers:stable/podman)
for a list of supported Ubuntu version and
architecture combinations. **NOTE:** The `sudo apt-get -y upgrade`
maybe required in some cases if Podman cannot be installed without it.

```bash
. /etc/os-release
echo "deb https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/xUbuntu_${VERSION_ID}/ /" | sudo tee /etc/apt/sources.list.d/devel:kubic:libcontainers:testing.list
curl -L https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/testing/xUbuntu_${VERSION_ID}/Release.key | sudo apt-key add -
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
  containernetworking-cni \
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
  pkgconfig \
  runc \
  containers-common
```

Debian, Ubuntu, and related distributions:

```bash
sudo apt-get install \
  btrfs-tools \
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
  libprotobuf-c0-dev \
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

A proper description of setting up CNI networking is given in the [`cni` README](https://github.com/containers/podman/blob/master/cni/README.md).

A basic setup for CNI networking is done by default during the installation or make processes and
no further configuration is needed to start using Podman.

#### Add configuration

```bash
sudo mkdir -p /etc/containers
sudo curl -L -o /etc/containers/registries.conf https://raw.githubusercontent.com/projectatomic/registries/master/registries.fedora
sudo curl -L -o /etc/containers/policy.json https://raw.githubusercontent.com/containers/skopeo/master/default-policy.json
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

As with other Go projects, Podman must be cloned into a directory structure like:

```
GOPATH
└── src
    └── github.com
        └── containers
            └── podman
```

First, ensure that the go version that is found first on the $PATH (in case you built your own; see [above](#golang)) is sufficiently recent -
`go version` must be higher than 1.12.x). Then we can finally build Podman (assuming we already have a `$GOPATH` and the corresponding folder,
`export GOPATH=~/go && mkdir -p $GOPATH`):

```bash
git clone https://github.com/containers/podman/ $GOPATH/src/github.com/containers/podman
cd $GOPATH/src/github.com/containers/podman
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

### registries.conf

#### Man Page: [registries.conf.5](https://github.com/containers/image/blob/master/docs/containers-registries.conf.5.md)

`/etc/containers/registries.conf`

registries.conf is the configuration file which specifies which container registries should be consulted when completing image names which do not include a registry or domain portion.

#### Example from the Fedora `containers-common` package

```
cat /etc/containers/registries.conf
# This is a system-wide configuration file used to
# keep track of registries for various container backends.
# It adheres to TOML format and does not support recursive
# lists of registries.

# The default location for this configuration file is /etc/containers/registries.conf.

# The only valid categories are: 'registries.search', 'registries.insecure',
# and 'registries.block'.

[registries.search]
registries = ['docker.io', 'registry.fedoraproject.org', 'quay.io', 'registry.access.redhat.com', 'registry.centos.org']

# If you need to access insecure registries, add the registry's fully-qualified name.
# An insecure registry is one that does not have a valid SSL certificate or only does HTTP.
[registries.insecure]
registries = []


# If you need to block pull access from a registry, uncomment the section below
# and add the registries fully-qualified name.
#
[registries.block]
registries = []
```

### [mounts.conf](https://src.fedoraproject.org/rpms/skopeo/blob/master/f/mounts.conf)

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

### [seccomp.json](https://src.fedoraproject.org/rpms/skopeo/blob/master/f/seccomp.json)

`/usr/share/containers/seccomp.json`

seccomp.json contains the whitelist of seccomp rules to be allowed inside of
containers.  This file is usually provided by the containers-common package.

The link above takes you to the seccomp.json

### [policy.json](https://github.com/containers/skopeo/blob/master/default-policy.json)

`/etc/containers/policy.json`

#### Man Page: [policy.json.5](https://github.com/containers/image/blob/master/docs/containers-policy.json.5.md)


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
