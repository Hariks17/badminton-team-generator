// src/Components/TeamGenerator.jsx - FIXED VERSION
import React, { useState, useEffect, useCallback } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Chips } from "primereact/chips";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const TeamGenerator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [players, setPlayers] = useState([]); // Start empty
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // NEW: Loading state

  // FIXED: Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("badmintonPlayers");
    if (saved) {
      try {
        const parsedPlayers = JSON.parse(saved);
        setPlayers(parsedPlayers);
      } catch (error) {
        console.error("localStorage parse error:", error);
        setPlayers([]);
      }
    } else {
      setPlayers([]);
    }
    setIsLoaded(true);
  }, []); // Only runs once on mount

  // Save to localStorage whenever players change (AFTER loaded)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("badmintonPlayers", JSON.stringify(players));
    }
  }, [players, isLoaded]);

  // Fisher-Yates Shuffle EXPLAINED ↓
  const shuffleArray = useCallback((array) => {
    const shuffled = [...array]; // Copy original array
    // Walk array BACKWARDS (i = last index to 1)
    for (let i = shuffled.length - 1; i > 0; i--) {
      // Pick random index j from 0 to i (inclusive)
      const j = Math.floor(Math.random() * (i + 1));
      // SWAP: shuffled[i] ↔ shuffled[j]
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const generateTeams = useCallback(() => {
    if (players.length === 0 || players.length % 2 !== 0) return;

    const shuffledPlayers = shuffleArray(players);
    const newTeams = [];

    for (let i = 0; i < shuffledPlayers.length; i += 2) {
      newTeams.push({
        id: Math.floor(i / 2) + 1,
        players: [shuffledPlayers[i], shuffledPlayers[i + 1]],
      });
    }

    setTeams(newTeams);
  }, [players, shuffleArray]);

  const clearAll = () => {
    setPlayers([]);
    setTeams([]);
  };

  const isReadyToGenerate = players.length > 0 && players.length % 2 === 0;

  // Show loading if not ready
  if (!isLoaded) {
    return <div>Loading players...</div>;
  }

  // Rest of your JSX stays EXACTLY the same...
  return (
    <div className="team-generator">
      {/* Your existing JSX - no changes needed */}
      <div className="container">
        <div className="content">
          <div className="section">
            <h2 className="section-title">Generate Teams</h2>
            <p className="section-desc">
              Add players below and click Generate for random doubles teams
            </p>
          </div>

          <div className="tab-container">
            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
              className="team-tabview"
            >
              <TabPanel header="Random Teams" leftIcon="pi pi-random">
                <div className="tab-panel-content">
                  <div className="input-section">
                    <label className="input-label">
                      Club Members ({players.length})
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

                  {teams.length > 0 && (
                    <div className="results-section">
                      <Card className="teams-card">
                        <h3 className="results-title">🎾 Generated Teams</h3>
                        <div className="teams-grid">
                          {teams.map((team) => (
                            <div key={team.id} className="team-card">
                              <div className="team-header">
                                <span className="team-number">
                                  Team {team.id}
                                </span>
                              </div>
                              <div className="team-players">
                                {team.players.map((player, idx) => (
                                  <div
                                    key={`${team.id}-${player}`}
                                    className="player-tag"
                                  >
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
                header="Balanced Teams"
                leftIcon="pi pi-balance-scale"
                disabled
              >
                <div className="coming-soon">
                  <div className="card-icon">⚖️</div>
                  <h3>Balanced Teams</h3>
                  <p>Good + Average player pairing in next iteration</p>
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
