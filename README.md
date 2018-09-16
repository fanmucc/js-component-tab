## 组件功能，实现HTML相同的两组Tab组件点击切换内容

## 组件实现方式，通过构造函数，面向对象

    1. 声明一个构造函数
    ``` function Tab(node) {
            this.node = node  // 获取的tab组件HTML的节点
        }
        //因为要进行继承复用等操作，所以把点击切换的方法写在构造函数的prototype属性中
        Tab.prototype = {
            constructor: tab,  // 指向原构造函数
            init: function() {
                console.log(this)   // this指向     function Tab(node) {....}
                this.bind()
            },
            bind: function() {
                //点击事件
            }
        }
        // 对象
        let tab1 = new Tab(document.querySelectorAll('.mod-tab')[0]) // 获取全部的Tab组件，通过下标来进行选择
        //调用Tab中prototype属性中的 init()
        tab1.init()
    ```
    组件的点击事件完成

    ## 如何使用

        ```
        //调用Tab中prototype属性中的 init()
        tab1.init()
        ```

    ## 难点

        组件的重复使用

        实现步骤：
        1. 创建新的构造函数，起名为People
        2. 属性获取 (获取Tab构造函数中的属性)
        简单示例：

        - 对象属性的获取是通过构造函数的执行，我们在一个类中执行另外一个类的构造函数，就可以把属性赋值到自己内部，但是我们需要把环境改到自己的作用域内，这就要借助我们讲过的函数call了

        ```
        function Person(name, sex){
            this.name = name;
            this.sex = sex;
        }

        Person.prototype.printName = function(){
            console.log(this.name);
        };

        function Male(age){
            this.age = age;
        }

        Male.prototype.printAge = function(){
            console.log(this.age);
        };


        ----
        //改造一些Male

        function Male(name, sex, age){
            Person.call(this, name, sex);
            this.age = age;
        }

        Male.prototype.printAge = function(){
            console.log(this.age);
        };
        ---
        //实例化看看结果

        var m = new Male('Byron', 'male', 26);
        console.log(m.sex); // "male"
        ```

        3. 方法获取
        
        - 我们知道类的方法都定义在了prototype里面，所以只要我们把子类的prototype改为父类的prototype的备份就好了

        ```
        function inherit(superType, subType){
            var _prototype  = Object.create(superType.prototype);  // 创建第三者 来接受被复制属性的构造函数
            _prototype.constructor = subType;                      // 将需求者赋值给第三者
            subType.prototype = _prototype;                        // 需求者的prototype属性等于第三者  === 被复制的构造函数的prototype属性
        }

        // inherit(a,b)
        //     c = a.1      //.1 代表prototype属性
        //     a.1.c1 = b
        //     b.1 = a.1
        ```
        
        - 我们知道prototype对象有一个属性constructor指向其类型，因为我们复制的父元素的prototype，这时候constructor属性指向是不对的，导致我们判断类型出错
        - 因此我们需要再重新指定一下constructor属性到自己的类型
        ``` People.prototype.constructor=People ```

        使用发现查看```tab.js```文件

        3. 构造新的对象获取第二个组件的文档节点
        ```var tab2 = new People(document.querySelectorAll('.mod-tab')[1]);```
        4. 调用点击方法
        ```tab2.init()


        ### 实现面向对象的方式实现 Tab 组件
