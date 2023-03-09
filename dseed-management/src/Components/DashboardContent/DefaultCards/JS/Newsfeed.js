import React, { Fragment, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import classes from "../CSS/Newsfeed.module.css";
import Updates from "../../../Classes/Updates";
import Application from "../../../Classes/Application";
import Button from "react-bootstrap/esm/Button";

function Newsfeed() {
    const [appList, setAppList] = useState([]);
    const [appNameList, setAppNameList] = useState(new Map());
    const [updateList, setUpdateList] = useState([]);

    useEffect(() => {
        populateAllApps();
        populateAllUpdates();
        populateAppNameList();
    }, [appList]);

    const populateAllApps = async () => {
        const app = new Application();
        const allApp = app.getAllApplications();
        allApp.then((app, index) => {
            setAppList(app);
        });
        
    };

    const populateAppNameList = () => {
        appList.map((app, index) => {
            setAppNameList(new Map(appNameList.set(app.data.applicationID,app.data.applicationName )));
        })
    }

    const populateAllUpdates = async () => {
        const updates = new Updates();
        updates.fetchUpdates().then((update, index) => {
            setUpdateList(update);
        });
    };
    return (
        <Fragment>
            <Card className={classes.cardLayout}>
                <Card.Body>
                    <Card.Title>
                        <h1>Newsfeed</h1>
                    </Card.Title>
                    <Tabs
                    
                        className="mb-3"
                        justify
                        fill
                    >
                        {updateList.map((update, index) => (
                            <Tab
                                eventKey={update.id}
                                title={`${appNameList.get(update.data.applicationID)}`}
                            >
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Version</th>
                                            <th>Update Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {update.data.updates.map((up, idx) => (
										<tr>
										<td>{`${new Date(up.Date.seconds*1000).toISOString().slice(0, 10)}`}</td>
                                        <td>{up.Version}</td>
                                        <td>{up.Update}</td>
										 </tr>
										))}
                                    </tbody>
                                </Table>
                            </Tab>
                        ))}
                    </Tabs>
                </Card.Body>
            </Card>
        </Fragment>
    );
}

export default Newsfeed;
