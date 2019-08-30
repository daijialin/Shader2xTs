
const { ccclass, property } = cc._decorator;

@ccclass
export default class ShaderTest extends cc.Component {

    @property(cc.Node)
    shaderRoot: cc.Node = null

    @property(cc.Node)
    lastBtn: cc.Node = null

    @property(cc.Node)
    nextBtn: cc.Node = null

    @property(cc.SpriteFrame)
    spriteFrame: cc.SpriteFrame = null

    _curIndex = 0
    _totalCount = 0

    start() {
        this._totalCount = this.shaderRoot.childrenCount
        this.lastBtn.on("click", this.onLastBtnClick, this)
        this.nextBtn.on("click", this.onNextBtnClick, this)
        this.shoChild()
    }

    private onLastBtnClick() {
        this._curIndex--
        if (this._curIndex < 0) {
            this._curIndex = this._totalCount - 1
        }
        this.shoChild()
    }

    private onNextBtnClick() {
        this._curIndex++
        if (this._curIndex >= this._totalCount) {
            this._curIndex = 0
        }
        this.shoChild()
    }

    private shoChild() {
        let length = this._totalCount
        for (let i = 0; i < length; i++) {
            this.shaderRoot.children[i].active = i == this._curIndex
        }
    }

}
