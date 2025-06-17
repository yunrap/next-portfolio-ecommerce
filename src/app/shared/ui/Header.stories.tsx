import type { Meta, StoryObj } from '@storybook/nextjs';
import Header from './Header';
import { fn } from 'storybook/test';
const meta: Meta<typeof Header> = {
  title: 'layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
