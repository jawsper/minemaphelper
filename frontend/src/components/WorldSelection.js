import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class WorldSelection extends React.Component {
    static propTypes = {
        current_world: PropTypes.number,
        worlds: ImmutablePropTypes.map.isRequired,
    }

    render() {
        const { current_world, worlds } = this.props;

        // No need to show if no worlds to choose from
        if (worlds.size == 0) {
            return null;
        }
        return (
            <NavDropdown title="Select world">
                {worlds.toList().toJS().map(world => {
                    return (<NavDropdown.Item
                        key={world.pk}
                        active={world.pk === current_world}
                        onClick={() => this.props.onSelectWorld(world.pk)}>
                        {world.name}
                    </NavDropdown.Item>);
                })}
            </NavDropdown>
        );
    }
}