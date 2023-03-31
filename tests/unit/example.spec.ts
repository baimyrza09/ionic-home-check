import { mount } from '@vue/test-utils';
import ActiveClaimsList from '@/pages/ActiveClaimsList.vue';

describe('ActiveClaimsList.vue', () => {
  it('renders tab 1 ActiveClaimsList', () => {
    const wrapper = mount(ActiveClaimsList);
    expect(wrapper.text()).toMatch('Tab 1 page');
  });
});
