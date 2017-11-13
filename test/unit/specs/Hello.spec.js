import Vue from 'vue'
import Judges from '@/components/Judges'

describe('Judges.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Judges)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
