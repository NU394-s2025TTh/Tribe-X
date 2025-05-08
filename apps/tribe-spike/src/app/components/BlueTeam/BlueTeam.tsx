import { ITeamMember } from '../../teamMembers';

interface IProps {
  members: ITeamMember[];
}

export function BlueTeam({ members }: IProps) {
  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Blue Team</h2>
      {members.map(member => (
        <div key={member.email} className="flex items-center gap-4 mb-2">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-12 h-12 rounded-full border"
          />
          <div>
            <p>{member.name}</p>
            <a href={`mailto:${member.email}`} className="text-blue-600 underline">
              {member.email}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}