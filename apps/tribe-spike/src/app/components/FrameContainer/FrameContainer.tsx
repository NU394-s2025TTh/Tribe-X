import { teamMembers } from '../../teamMembers';
import { BlueTeam } from '../BlueTeam/BlueTeam';
import { RedTeam } from '../RedTeam/RedTeam';

export function FrameContainer() {
  return (
    <div className="p-8 font-sans space-y-8">
      <h1 className="text-3xl font-bold text-center">Tribe X Iteration 0 Architecture Spike</h1>
      <div className="w-full flex gap-5">
        <BlueTeam members={teamMembers.filter(m => m.team === 'Blue')} />
        <RedTeam members={teamMembers.filter(m => m.team === 'Red')} />
      </div>
    </div>
  );
}
