import React, { Component } from "react"
import { Button } from 'reactstrap'


export default class BehaviorList extends Component {

    // Set initial state
    state = {
        behaviorId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewAssignedBehavior = evt => {
        evt.preventDefault()
        // Ensure a behavior has been chosen from the dropdown
        if (this.state.behaviorId === "") {
            window.alert("Please choose a behavior to add")
        } else {
          const assignedBehavior = {
            animalId: this.props.animal.id,
            behaviorId: parseInt(this.state.behaviorId)
          }

          // Create the behavior
          this.props
            .addAssignedBehavior(assignedBehavior)
        }
      }

      componentDidMount() {
        this.setState({
                behaviorId: ""
        })
        }

    render() {

        let thisAnimalsBehaviors = this.props.assignedBehaviors.filter(behavior => behavior.animalId === this.props.animal.id)
        let behaviorNameArray = thisAnimalsBehaviors.map(behavior => behavior.behavior.name)

        return (

            <React.Fragment>
                {/* Filter out current animal's behaviors, make list item for each */}
                {
                    thisAnimalsBehaviors
                        .map(behavior => <div key={behavior.id}><div>{behavior.behavior.name}</div>
                              <Button color="info"
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => {
                                      let confirm = window.confirm("Are you sure you want to delete this behavior?")
                                      if (confirm === true) {
                                          this.props.deleteAssignedBehavior(behavior.id)
                                      }
                                  }}
                              >Delete</Button>
                            </div>)
                }

                {/* dropdown to add behaviors to animal */}
                <select
              defaultValue=""
              name="behavior"
              id="behaviorId"
              onChange={this.handleFieldChange}
            >
              <option value="">Add A Behavior</option>
              {
                  this.props.behaviors.map(b => {
                      // Only show behaviors that don't already exist on that animal
                    if (behaviorNameArray.includes(b.name) === false) {
                    return <option key={b.id} id={b.id} value={b.id}>{b.name}</option>
                    }})
              }
            </select>
                <Button color="info"
                    type="button"
                    className="btn btn-success"
                    onClick={this.constructNewAssignedBehavior}
                    >Add</Button>
            </React.Fragment>
        )
    }
}