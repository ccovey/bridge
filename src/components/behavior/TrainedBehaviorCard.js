import React, { Component } from "react"

export default class TrainedBehaviorCard extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.sessionBehaviors.filter(sessionBehavior => sessionBehavior.sessionId === this.props.session.id)
                        .map(sessionBehavior => <div key={sessionBehavior.id}>
                                {sessionBehavior.behavior.name}, {sessionBehavior.rating}/5<br/>
                                {sessionBehavior.notes}
                            </div>)
                }
            </React.Fragment>
        )
    }
}