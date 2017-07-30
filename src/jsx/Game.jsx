const React = require("react");
const player1 = Symbol("player1");
const player2 = Symbol("player1");
const player1_char = "X";
const player2_char = "O";


const calcCriticalCells = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  let critical_calls = [];
  
  for(const line of lines){
    if(line.map((x) => board[x]).reduce((s, x) => s === x ? x : null) !== null)critical_calls = critical_calls.concat(line);
  }
  
  return critical_calls.filter((x, i, self) => self.indexOf(x) === i);
};

const getBoardsDiff = (board1, board2) => {
  for(let i = 0; i < board1.length; i++){
    if(board1[i] !== board2[i]){
      return {
        index: i,
        value1: board1[i],
        value2: board2[i]
      };
    }
  }
  
  return null;
};


const Cell = (props) => {
  const char = props.value === null ? "" : props.value === player1 ? player1_char : player2_char;
  return <button className={`board__cell ${props.isCritical}`} onClick={props.onClick}>{char}</button>;
};

const Board = (props) => {
  const critical_calls = calcCriticalCells(props.values);
  const blocks = props.values.map((x, i) => {
    const is_critical = critical_calls !== null && critical_calls.indexOf(i) !== -1 ? "is-critical" : "";
    return <Cell value={x} onClick={() => props.onClickButtons(i)} isCritical={is_critical} key={`cell_${i}`} />;
  });
  return <div className="board">{blocks}</div>;
};

const Information = (props) => {
  const now_player = props.historyIndex % 2 === 0 ? player1_char : player2_char;
  let information_text = "";
  
  const now_critical_lines = calcCriticalCells(props.history[props.historyIndex]);
  
  if(now_critical_lines.length === 0){
    if(props.historyIndex === 9){
      information_text = "Draw";
    }else{
      information_text = `Next Player : ${now_player}`;
    }
  }else{
    const winner = props.historyIndex % 2 === 0 ? player2_char : player1_char;
    information_text = `Winner : ${winner} !`;
  }
  
  return <div className="information">{information_text}</div>;
};

const History = (props) => {
  const items = props.history.map((x, i, self) => {
    const is_active = i === props.historyIndex ? "is-active" : "";
    let boards_diff;
    if(i !== 0){
      boards_diff = getBoardsDiff(self[i - 1], self[i]);
      boards_diff.value = boards_diff.value2 === player1 ? player1_char : player2_char;
      boards_diff.x = Math.floor(boards_diff.index / 3);
      boards_diff.y = boards_diff.index % 3;
    }
    return <li className={`history__item ${is_active}`} key={`history__item_${i}`} ><a onClick={() => props.onClickItem(i)} href="#">{i === 0 ? "New Game Start" : `put ${boards_diff.value} to (${boards_diff.x}, ${boards_diff.y})`}</a></li>;
  });
  return <ol className="history">{items}</ol>;
};

class Game extends React.Component {
  constructor(){
    super();
    
    this.state = {
      history: [Array.from({length: 9}, () => null)],
      history_index: 0
    };
  }
  onClickHandler(i){
    if(calcCriticalCells(this.state.history[this.state.history_index]).length !== 0)return;
    if(this.state.history[this.state.history_index][i] !== null)return;
    
    let new_history = this.state.history.slice(0, this.state.history_index + 1);
    let new_history_index = this.state.history_index;
    
    new_history.push(new_history[new_history.length - 1].slice());
    new_history_index++;
    new_history[new_history.length - 1][i] = new_history_index % 2 === 0 ? player2 : player1;
    
    this.setState({
      history: new_history,
      history_index: new_history_index
    });
  }
  setHistory(i){
    this.setState({history_index: i});
  }
  render(){
    return (
      <div className="view">
        <div className="view__left">
          <Board values={this.state.history[this.state.history_index]} onClickButtons={this.onClickHandler.bind(this)} />
        </div>
        <div className="view__right">
          <Information history={this.state.history} historyIndex={this.state.history_index} />
          <History history={this.state.history}  historyIndex={this.state.history_index} onClickItem={this.setHistory.bind(this)} />
        </div>
      </div>
    );
  }
}

exports.Game = Game;