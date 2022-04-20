import { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function Profile() {
    const [loggato, setLoggato] = useState(getCookie('username') != '');

    function getCookie(cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }


    return (
        <>
            {loggato ? (
                <Tabs isFitted variant='enclosed'>
                    <TabList>
                        <Tab>Film Preferiti</Tab>
                        <Tab>Film gia visti</Tab>
                        <Tab>Prenotazioni</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>two!</p>
                        </TabPanel>
                        <TabPanel>
                            <p>three!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            ) : (window.location.href='/')}
        </>
    );
}

export default Profile;
