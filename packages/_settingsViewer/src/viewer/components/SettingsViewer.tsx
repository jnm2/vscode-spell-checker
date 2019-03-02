import * as React from 'react';
import {observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';
import Tab from '@material/react-tab';
import TabBar from '@material/react-tab-bar';
import {AppState, Tab as AppTab} from '../AppState';
import { LanguagePanel } from './panelLanguage';
import { PanelConfig } from './panelConfig';
import { isConfigTarget } from '../../api/settings';
import { PanelDictionaries } from './panelDictionaries';
import { PanelAbout } from './panelAbout';

@observer
export class SettingsViewer extends React.Component<{appState: AppState}, {}> {
    render() {
        const appState = this.props.appState;
        const activeTabIndex = appState.activeTabIndex || 0;
        const renderTab = (tab: AppTab, index: number) =>
            <div key={tab.label} className={appState.activeTabIndex === index ? 'panel active' : 'panel'}>
                {isConfigTarget(tab.target)
                    ? <PanelConfig appState={appState} target={tab.target}></PanelConfig>
                    : tab.target === 'languages' ? <LanguagePanel appState={appState}></LanguagePanel>
                    : tab.target === 'dictionaries' ? <PanelDictionaries appState={appState}></PanelDictionaries>
                    : tab.target === 'about' ? <PanelAbout appState={appState}></PanelAbout>
                    : <div></div>
                }
            </div>;
        return (
            <div>
                <TabBar
                    activeIndex={activeTabIndex}
                    handleActiveIndexUpdate={this.activateTab}
                >
                    {appState.tabs.map((tab, index) =>
                        <Tab key={index}>
                            <span className="mdc-tab__text-label">{tab.label}</span>
                        </Tab>
                    )}
                </TabBar>

                {appState.tabs.map(renderTab)}
            </div>
        );
     }

     activateTab = (activeIndex: number) => {
        this.props.appState.activeTabIndex = activeIndex;
     }
}
