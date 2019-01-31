import Vue from 'vue';
import '../directives/ContextMenu';
import Icon from '../features/icons';
import '../styles/styles.scss';

import { storiesOf } from '@storybook/vue';

const confirmCb = (option, el) => {
  el.querySelector('input').checked = option.key === "yes";
}

storiesOf('Directives', module)
  .add('Context Menu', () => ({
    components: { },
    data: () => ({
      icon: Icon.MENU,
      left: [
        "Delete",
        "Rename",
        "Engage Warp Drive"
      ],
      right: [
        "Highlight",
        "Lowlight",
        "Relight"
      ],
      confirm: [
        { text: "Yes", key: "yes", onclick: confirmCb },
        { text: "No", key: "no", onclick: confirmCb }
      ],
      htmlMenu: [
        { html: "<strong>Bold</strong>" },
        { html: "<small>Small</small>" },
        { text: "Or even disabled", disabled: true }
      ]
    }),
    template: `<article class="story">
                 <h1>Context Menu</h1>
                 <section>
                   <p>Context menus can be attached to any DOM object to add a floating menu.</p>
                   <p>The menu will ensure that it will never place itself outside of the left or right bounds.</p>
                   <details><summary>Demo</summary>
                     <span class="button" v-menu:context="left">Right aligned as there is no room</span>
                     <span class="button" v-menu:context="right">This should be left aligned</span>
                   </details>
                 </section>
                 <section>
                   <p>They can for example, be attached to input fields for confirmation.</p>
                   <details><summary>Demo</summary>
                     <label v-menu:context="confirm"><input type="checkbox"/>Enable Cookies?</label>
                   </details>
                 </section>
                 <section>
                   <p>They can also have custom HTML</p>
                   <details><summary>Demo</summary>
                     <span class="button" v-menu:context="htmlMenu">Click Me</span>
                   </details>
                 </section>
                 <section>
                   <p>By design, menus become children of the DOM object they are associated with.
                      To prevent things such as highlight states, a nesting technique should be employed.</p>
                   <details><summary>Demo</summary>
                      <span v-menu:context="left"><span class="button">Demo</span></span>
                   </details>
                 </section>
               </article>`
  }));
