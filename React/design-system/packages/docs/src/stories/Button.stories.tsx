import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@ui/react";

export default {
  title: "Button",
  component: Button,
} as Meta;

export const Primary: StoryObj = {
  args: {
    children: "Teste"
  }
}

export const Secondary: StoryObj = {}
