import { type ChangeEvent, type FC, useCallback, useEffect, useState } from 'react';
import { Switch }                                                      from "@/components/switch";
import { Card }                                                        from "@/components/card";
import { SaveService }                                                 from "@/services/save";
import { GetService }                                                  from "@/services/getData";
import type { IContact }                                               from "@/helper/types";
import { useQuery }                                                    from "@/hooks/useQuery";
import { BaseAdminPage }                                               from "@/components/baseAdminPage";


const defSocial: IContact = {
  visible: false,
  url    : '',
  color  : '',
  icon   : ''
}
const defaultContacts: IContact[] = [...Array(10)].map((_) => defSocial)

const ContactsPage: FC = () => {
  const query = useQuery()
  const [defaultValues, setDefaultValues] = useState<IContact[]>([])
  const [contacts, setContacts] = useState<IContact[]>(defaultContacts)


  const canSave = JSON.stringify(contacts) !== JSON.stringify(defaultValues)

  const onChangeContact = useCallback((index: number, name: keyof IContact) => (e: ChangeEvent<HTMLInputElement>) => {
    setContacts(current => current.map((soc, socIndex) => socIndex === index
      ? {...soc, [name]: e.target.value}
      : soc
    ))
  }, [])
  const onChangeSocialStatus = (index: number) => {
    setContacts(current => current.map((soc, socIndex) => socIndex === index
      ? {...soc, visible: !soc.visible}
      : soc
    ))
  }

  const setData = (data: IContact[]) => {

    setContacts(defaultContacts.map((defContact, index) => !!data?.[index] ? data[index] : defContact))
    setDefaultValues(defaultContacts.map((defContact, index) => !!data?.[index] ? data[index] : defContact))
  }

  useEffect(() => {
    (async () => {
      const myQuery = query<IContact[]>(GetService.contacts)
      const res = await myQuery()
      console.log(res)
      setData(res)
    })()
  }, [])


  const onSave = async () => {
    const saveQuery = query<IContact[]>(() => SaveService.contacts(contacts.filter(contact => !!contact.url)))
    const res = await saveQuery()
    setData(res)


  }

  return (
    <BaseAdminPage title="Contacts" canSave={canSave} onSave={onSave} >
      <a className="text-2xl font-bold hover:underline flex w-full items-center justify-center" href="https://fontawesome.com/search">Find a icons HERE!!!</a>

      <Card width={1032}>
        <div className="row">
          <div className="row-el-5%">Icon</div>
          <div className="row-el-20%">Icon Name</div>
          <div className="w-[110px]">Color</div>
          <div className="flex-1">Link</div>
          <div className="row-el-5%">Status</div>
        </div>
        {
          contacts.map((contact, index) => <div key={index} className="row">
            <div className="row-el-5% flex items-center justify-center"><i className={contact.icon} style={{color: contact.color}}/></div>
            <input className="row-el-20%" value={contact.icon} onChange={onChangeContact(index, "icon")}/>
            <input className="max-w-[110px]" value={contact.color} onChange={onChangeContact(index, "color")}/>
            <input className="flex-1" value={contact.url} onChange={onChangeContact(index, "url")}/>
            <div className="row-el-5%  flex items-center justify-center">
              <Switch status={contact.visible} onChange={() => onChangeSocialStatus(index)}/>
            </div>
          </div>)
        }
      </Card>



    </BaseAdminPage>
  );
};

export default ContactsPage
