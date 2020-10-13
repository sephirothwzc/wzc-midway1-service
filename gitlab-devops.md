# gitlab install

```shell

$ ssh root@xxxx

$ yum update -y

$ yum install wget -y

$ wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-11.4.6-ce.0.el7.x86_64.rpm

$ yum install policycoreutils-python -y

$ rpm -ivh gitlab-ce-11.4.6-ce.0.el7.x86_64.rpm

# 修改 gitlab的外部访问地址
# 查看
$ grep "^external_url" /etc/gitlab/gitlab.rb

# external_url http://xxx.xxx.xxx.xx
$ vim /etc/gitlab/gitlab.rb

# 数据库以及相关配置
$ gitlab-ctl reconfigure

# 启动
$ gitlab-ctl restart

# 查看是否启动成功
$ netstat -tlnp

# 启动
$ gitlab-ctl status

# http://xxx.x.x.xxx 修改root密码

```

修改端口

```vim
external_url 'http://192.168.1.68:9091'

nginx['listen_port'] = 9091
#unicorn['listen'] = '192.168.1.68'
unicorn['port'] = 9092
```

```shell
# 让配置生效，重新执行此命令时间也比较长
$ gitlab-ctl reconfigure
$ gitlab-ctl restart
```

## gitlab-runner

```shell
# gitlab-runner rpm包

$ curl -s https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.rpm.sh | sudo bash

# 安装
$ yum install gitlab-runner -y

# 启动 gitlab-runner
$ systemctl start gitlab-runner

$ systemctl status  gitlab-runner

# 注册 gitlab
$ gitlab-runner register

# gitlab-settings-cicd-set up a specific runner manually (url\token) 注册完成后刷新页面看到新绑定

# 查看更新结果
$ cat /etc/gitlab-runner/config.toml
```
