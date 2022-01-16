import React from 'react';
import Input from "../../components/UI/Input.js";
import Tooltip from "../../components/UI/Tooltip";
import { useGameBalance } from "../../hooks";

function InGameBalance() {

  const {
    actualGameBalance,
    unallocatedInGameBalance,
    allocatedInGameBalance,
  } = useGameBalance();

  return (
    <React.Fragment>
      <div>
        <label htmlFor="actual-game" className="game-label">
          <h5>Actual game balance</h5>
          <Tooltip info="Actual amount of Token in Smart Contract" />
        </label>
        <Input
          disabled
          type="number"
          id="actual-game"
          className="input-main large disable"
          value={actualGameBalance}
        />
      </div>

      <div>
        <label htmlFor="unallocated" className="game-label">
          <h5>Unallocated in-game balance</h5>
          <Tooltip info="Balance deposited by Admin and has not been granted to any players" />
        </label>
        <Input
          disabled
          type="number"
          id="unallocated"
          className="input-main large disable"
          value={unallocatedInGameBalance}
        />
      </div>

      <div>
        <label htmlFor="allocated" className="game-label">
          <h5>Allocated in-game balance</h5>
          <Tooltip info="Balance owned by All Players" />
        </label>
        <Input
          disabled
          type="number"
          id="allocated"
          className="input-main large disable"
          value={allocatedInGameBalance}
        />
      </div>
    </React.Fragment>
  );
}

export default InGameBalance;