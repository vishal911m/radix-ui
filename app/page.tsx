"use client";

import { Contact, useContacts } from "@/lib/contacts";
import { Pencil1Icon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Spinner } from "./spinner";
import Modal from "./modal";
import Button from "./button";

export default function Page() {
  let {contacts} = useContacts();

  return (
    <div>
      <header className="flex items-center justify-between bg-blue-950 p-4">
        <p className="font-medium">ThingsCode</p>
        <Modal>
          <Modal.Button asChild>
          <Button icon={<QuestionMarkCircledIcon />}>About</Button>
          </Modal.Button>
          <Modal.Content title="About Trello">
            <div className="mt-4 space-y-3 text-gray-600">
              <p>This is a React app built with Radix UI!</p>
              <p>Technologies used:</p>
              <ul className="list-disc pl-4">
                <li>Radix UI Dialog</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </Modal.Content>
        </Modal>
      </header>

    <div className="py-10">
      <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-gray-200 p-4">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} /> 
        ))}
      </div>
    </div>
    </div>
  );
}

function ContactCard({contact}: {contact: Contact}){
  let {updateContact} = useContacts();
  let [open, setOpen] = useState(false);

  return (
    <div
      className="flex justify-between rounded-lg bg-white px-4 py-4 text-gray-900 shadow"
      key={contact.id}
    >
      <div>
        <p>{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.role}</p>
        <p className="text-sm text-gray-500">{contact.email}</p>
      </div>
      <div>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button className="rounded p-2 hover:bg-gray-200">
            <Pencil1Icon />
          </Modal.Button>

          <Modal.Content title="Edit contact">
            <ContactForm contact={contact} afterSave={()=>setOpen(false)}/>
          </Modal.Content>
        </Modal>

        {/* <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="rounded p-2 hover:bg-gray-200">
            <Pencil1Icon />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms] 
            fixed inset-0 bg-black/50" />
            <Dialog.Content className="data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms] 
            fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow ">
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
          </Dialog.Portal>
        </Dialog.Root> */}
      </div>
    </div>
  );
}

function ContactForm({contact, afterSave}: {contact: Contact, afterSave: ()=>void}) {
  const [saving, setSaving] = useState(false);
  let {updateContact} = useContacts();

  const handleSubmit = async(event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setSaving(true);

    let data = Object.fromEntries(new FormData(event.currentTarget));
    console.log(data);

    await updateContact(contact.id, data);
    afterSave();
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={saving} className="group">  
        <div className="mt-8 group-disabled:opacity-50">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">Name</label>
              <input
                autoFocus
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.name}
                name="name"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.role}
                name="role"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.email}
                name="email"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 space-x-6 text-right">
          <Modal.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
            Cancel
          </Modal.Close>
          <button className="inline-flex justify-center items-center rounded bg-green-500 px-4 py-2 text-sm font-medium 
          text-white hover:bg-green-600 group-disabled:pointer-events-none">
            <Spinner className="absolute h-4 group-enabled:opacity-0"/>
            <span className="group-disabled:opacity-0">Save</span>
          </button>
        </div>
      </fieldset>
    </form>
  );
}