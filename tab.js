function inherit(superType, subType) {
    var _prototype = Object.create(superType.prototype);
    _prototype.constructor = subType;
    subType.prototype = _prototype;
}


function Tab(node) {
    // node 是传入的dom节点  -> 父元素节点
    this.node = node
    // console.log(this.node)
    this.div1 = this.node.querySelector('.heafer')
}

Tab.prototype = {
    constructor: Tab,
    init: function () {
        // console.log('init',this)
        this.bind()
    },
    bind: function () {
        // console.log('bind',this)
        this.div1.querySelectorAll('.tab').forEach(node => {
            // console.log('node', node)
            // console.log(this)
            node.addEventListener('click', function () {
                // console.log('node1', this)
                let index
                // console.log('index', index)
                this.parentElement.querySelectorAll('.tab').forEach((tab, idx) => {
                    // console.log('tab', tab, 'idx', idx)
                    tab.classList.remove('active')
                    if (node === tab) {
                        index = idx
                    }
                })
                this.classList.add('active')
                this.parentElement.nextElementSibling.querySelectorAll('.panel').forEach(panel => {
                    panel.classList.remove('active')
                }
                )
                this.parentElement.nextElementSibling.querySelectorAll('.panel')[index].classList.add('active')
            })
        })
    }
}

function People(node) {
    Tab.call(this, node)
}
inherit(Tab, People)

People.prototype.constructor=People
let tab1 = new Tab(document.querySelectorAll('.mod-tab')[0]);
tab1.init()
// let tab2 = new Tab(document.querySelectorAll('.mod-tab')[1]);

var tab2 = new People(document.querySelectorAll('.mod-tab')[1]);
tab2.init()