import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Switch }                                                   from "../components/switch";
import { Card }                                                     from "../components/card";
import { SaveService }                                              from "../services/save";
import { GetService }                                               from "../services/getData";
import { IContact }                                                 from "../helper/types";
import { useQuery }                                                 from "../hooks/useQuery";
import { BaseAdminPage }                                            from "../components/baseAdminPage";


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
    <BaseAdminPage title="Contacts">


      <Card width={1032}>
        <h2>Socials</h2>
        <div className="row">
          <div className="icon"/>
          <div className="icon-input">Icon</div>
          <div className="color">Color</div>
          <div className="link">Link</div>
          <div className="status">Status</div>
        </div>
        {
          contacts.map((contact, index) => <div key={index} className="row">
            <div className="icon"><i className={contact.icon} style={{color: contact.color}}/></div>
            <input className="icon-input" value={contact.icon} onChange={onChangeContact(index, "icon")}/>
            <input className="color" value={contact.color} onChange={onChangeContact(index, "color")}/>
            <input className="link" value={contact.url} onChange={onChangeContact(index, "url")}/>
            <div className="status">
              <Switch status={contact.visible} onChange={() => onChangeSocialStatus(index)}/>
            </div>
          </div>)
        }
      </Card>

      <button className="btn" onClick={onSave} disabled={!canSave}>Save changes</button>


    </BaseAdminPage>
  );
};

export default ContactsPage
