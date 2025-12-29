// src/Components/TeamGenerator.jsx - SECTION 2 DISABLED
import React, { useState, useEffect, useCallback } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const TeamGenerator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    if (savedPlayers) {
      try {
        setPlayers(JSON.parse(savedPlayers));
      } catch (error) {
        console.error("Load players error:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players, isLoaded]);

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const generateTeams = useCallback(() => {
    if (players.length === 0 || players.length % 2 !== 0) {
      alert("Need even number of players!");
      return;
    }
    const shuffledPlayers = shuffleArray(players);
    const newTeams = [];
    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      newTeams.push({
        id: Math.floor(i / 2) + 1,
        players: [shuffledPlayers[i], shuffledPlayers[i + 1]],
        type: "random",
      });
    }
    setTeams(newTeams);
  }, [players, shuffleArray]);

  const clearAll = () => {
    setPlayers([]);
    setTeams([]);
  };

  const isReadyToGenerate = players.length > 0 && players.length % 2 === 0;

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="team-generator">
      <div className="container">
        <div className="content">
          <div className="section">
            <h2 className="section-title">Team Generator</h2>
            <p className="section-desc">{players.length} players ready</p>
          </div>

          <div className="tab-container">
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="team-tabview"
            >
              <TabPanel header="🎲 Random Teams" leftIcon="pi pi-random">
                <div className="tab-intro">
                  Pure random doubles pairing - perfect for casual play
                </div>
                <div className="tab-panel-content">
                  <div className="input-section">
                    <label className="input-label">
                      Players ({players.length})
                    </label>
                    <Chips
                      value={players}
                      onChange={(e) => setPlayers(e.value || [])}
                      placeholder="Type player name and press Enter..."
                      className="player-chips"
                      addOnBlur
                      allowDuplicate={false}
                    />
                    {!isReadyToGenerate && players.length > 0 && (
                      <div className="player-count warning">
                        Need even number (
                        {players.length % 2 === 0
                          ? "✓ Ready!"
                          : "Add 1 more player"}
                        )
                      </div>
                    )}
                  </div>
                  <div className="action-buttons">
                    <Button
                      label="Clear All"
                      icon="pi pi-trash"
                      severity="secondary"
                      outlined
                      onClick={clearAll}
                      className="clear-btn"
                    />
                    <Button
                      label={
                        isReadyToGenerate
                          ? `Generate ${players.length / 2} Teams`
                          : "Add Even Players"
                      }
                      icon="pi pi-bolt"
                      onClick={generateTeams}
                      disabled={!isReadyToGenerate}
                      className="generate-btn"
                    />
                  </div>
                  {teams.length > 0 && teams[0]?.type === "random" && (
                    <div className="results-section">
                      <Card className="teams-card">
                        <h3 className="results-title">
                          🎲 Random Teams Generated
                        </h3>
                        <div className="teams-grid">
                          {teams.map((team) => (
                            <div key={team.id} className="team-card">
                              <div className="team-header">
                                <span className="team-number">
                                  Team {team.id}
                                </span>
                              </div>
                              <div className="team-players">
                                {team.players.map((player) => (
                                  <div key={player} className="player-tag">
                                    {player}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              </TabPanel>

              <TabPanel
                header="⚖️ Balanced Teams (Coming Soon)"
                leftIcon="pi pi-balance-scale"
                disabled
              >
                <div className="coming-soon">
                  <div className="card-icon">⚖️</div>
                  <h3>Balanced Teams</h3>
                  <p>1 Good (A) + 1 Average (B) per team</p>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#718096",
                      marginTop: "1rem",
                    }}
                  >
                    Coming in next update - stay tuned!
                  </p>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamGenerator;
