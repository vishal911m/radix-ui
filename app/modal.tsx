import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export default function Modal({
  open, 
  onOpenChange,
  children
}: {
  open: boolean, 
  onOpenChange: (open: boolean)=>void,
  children: ReactNode
}){
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {/* <Dialog.Trigger className="rounded p-2 hover:bg-gray-200">
        <Pencil1Icon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50
        data-[state=open]:animate-[dialog-overlay-show_200ms] data-[state=closed]:animate-[dialog-overlay-hide_200ms]" />
        <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] 
        fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl">
              Edit contact
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <Cross1Icon />
            </Dialog.Close>
          </div>
          <ContactForm contact={contact} afterSave={()=>setOpen(false)}/>
        </Dialog.Content>
      </Dialog.Portal> */}
    </Dialog.Root>
  )
}