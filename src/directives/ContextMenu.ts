import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
template: `<div class="context-menu">
             <div class="context-menu--fader" @click.capture.stop.prevent="dismiss"></div>
             <ul class="context-menu--menu" @click.prevent.stop="">
               <li v-for="(value, key) in data"
                 :v-index="key"
                 @click.stop.prevent="processClick(value)"
                 v-html="renderItem(value)"
                 :class="{disabled: value.disabled}"></li>
             </ul>
           </div>`
})
class ContextMenuComponent extends Vue {
  public _data? : any[];
  public onclick? : (key:string, target: HTMLElement) => null;
  public target? : HTMLElement;

  set data(input: any[] | undefined) {
    this._data = input.map( (it : any) => {
      switch (true) {
        case it instanceof String:
          return { text: it }
        case it instanceof Object:
          return it;
        case it instanceof ((string, HTMLElement)=>null):
          return it;
      }
      }).filter( (it: any) => it instanceof Object );
  }

  get data() : any[] | undefined { return this._data }


  dismiss() {
    this.$el.classList.remove('visible');
    setTimeout(()=>{
      this.$el.classList.remove('context-menu__right')
      this.$el.parentNode.removeChild(this.$el)
    }, 200);
  }

  private renderItem(item : any) {
    return item.text || item.html || item;
  }

  private processClick(target: any) {
    if (target.disabled||false) return;
    if (target.onclick) target.onclick(target, this.target!!)
    else if (this.onclick) this.onclick(target, this.target!!);
    this.dismiss();
  }
}

class ContextMenu {
  private static instance?: ContextMenuComponent;

  constructor(private data?: any) {}

  public open(event: any) {
    //if (event.target !== event.currentTarget) return;
    if (ContextMenu.instance) {
      ContextMenu.instance.$el.classList.remove('visible');
    }
    ContextMenu.instance = ContextMenu.instance || new ContextMenuComponent();
    let inst = ContextMenu.instance;
    inst.data = this.data.menu || this.data || [];
    inst.onclick = this.data.callback || (()=>{});
    inst.target = event.target;
    inst.$mount();
    event.target.insertBefore(inst.$el, event.target.firstChild);
    setTimeout(()=>inst.$el.classList.add('visible'),1);
    let popup = inst.$el.querySelector('.context-menu--menu') as HTMLElement;
    let rect = inst.$el.getBoundingClientRect();
    rect.left < 100 ? inst.$el.classList.add('context-menu__right') :
      inst.$el.classList.remove('context-menu__right');
      rect = inst.$el.getBoundingClientRect();
  }
}

Vue.directive('menu', {
  bind: (el: HTMLElement, binding: any, vnode: any) => {
    vnode.contextMenu = new ContextMenu(binding.value);
    el.addEventListener('click', (e)=>{vnode.contextMenu.open(e); e.preventDefault();});
    el.addEventListener('change', (e)=>{vnode.contextMenu.open(e); e.preventDefault();});
    el.classList.add('directive--context-menu');
  }
});
