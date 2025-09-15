import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button } from './button';

const meta: Meta<typeof DialogContent> = {
  title: 'UI/Dialog',
  component: DialogContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'large', 'fullscreen'],
    },
    showCloseButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Dialog
export const Default: Story = {
  render: args => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="red">기본 다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>기본 다이얼로그</DialogTitle>
          <DialogDescription>
            이것은 기본 크기의 다이얼로그입니다. 작은 폼이나 간단한 정보를
            표시할 때 사용합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground text-sm">
            여기에 콘텐츠가 들어갑니다.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="black">취소</Button>
          </DialogClose>
          <Button variant="red">확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'default',
    showCloseButton: false,
  },
};

// 큰 Dialog (Figma 디자인과 유사)
export const Large: Story = {
  render: args => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="red">큰 다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>상품 등록</DialogTitle>
          <DialogDescription>
            새로운 상품을 등록하세요. 모든 필수 정보를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="black">취소</Button>
          </DialogClose>
          <Button variant="red">상품 등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'large',
    showCloseButton: true,
  },
};

// 전체화면 Dialog
export const Fullscreen: Story = {
  render: args => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="red">전체화면 다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>전체화면 다이얼로그</DialogTitle>
          <DialogDescription>
            전체 화면에 가까운 크기의 다이얼로그입니다. 복잡한 폼이나 많은
            데이터를 표시할 때 사용합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 py-4">
          <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-semibold">섹션 1</h3>
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="rounded-md border p-3">
                    항목 {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">섹션 2</h3>
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="rounded-md border p-3">
                    항목 {i + 1}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold">섹션 3</h3>
              <div className="space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="rounded-md border p-3">
                    항목 {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="black">취소</Button>
          </DialogClose>
          <Button variant="red">저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'fullscreen',
    showCloseButton: true,
  },
};

// 닫기 버튼 없는 Dialog
export const WithoutCloseButton: Story = {
  render: args => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="red">닫기 버튼 없는 다이얼로그</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>확인 필요</DialogTitle>
          <DialogDescription>
            이 작업을 계속하시겠습니까? 이 다이얼로그는 닫기 버튼이 없습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            반드시 하단의 버튼을 통해서만 닫을 수 있습니다.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="black">아니요</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="red">네, 계속하겠습니다</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'default',
    showCloseButton: false,
  },
};

// 스크롤이 있는 긴 콘텐츠 Dialog
export const ScrollableContent: Story = {
  render: args => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="red">스크롤 다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>긴 콘텐츠</DialogTitle>
          <DialogDescription>
            이 다이얼로그는 많은 콘텐츠를 포함하고 있어 스크롤이 필요합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="rounded-md border p-4">
              <h4 className="font-medium">항목 {i + 1}</h4>
              <p className="mt-2 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="black">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {
    size: 'large',
    showCloseButton: true,
  },
};
