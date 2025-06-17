import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { RoundedIcon } from './RoundedIcon';
import { HeartIcon, ArrowLeftIcon, EyeIcon } from '@heroicons/react/24/outline';

const meta: Meta<typeof RoundedIcon> = {
  title: 'components/RoundedIcon',
  component: RoundedIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: { type: 'radio' },
      options: ['gray', 'blue', 'red'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RoundedIcon>;

export const LeftButton: Story = {
  args: {
    size: 'lg',
    color: 'gray',
    children: <ArrowLeftIcon className="h-6 w-6" style={{ border: 1 }} />,
  },
};

export const WhiteHeart: Story = {
  args: {
    size: 'md',
    color: 'white',
    children: <HeartIcon className="h-5 w-5 text-black" />,
  },
};

export const WhiteEye: Story = {
  args: {
    size: 'md',
    color: 'white',
    children: <EyeIcon className="h-5 w-5 text-black" />,
  },
};
