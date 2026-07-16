/**
 * Midea Washer Card
 * Home Assistant 自定义卡片 - 适配 midea_auto_cloud 集成
 * 基于 binary_sensor.xxxx_status 实体属性显示洗衣机状态与控制
 *
 * 配置示例:
 * type: custom:midea-washer-card
 * entity: binary_sensor.midea_washer_status
 */

import { LitElement, html, css, svg } from 'lit';

// ─── 洗涤阶段定义 ────────────────────────────────────────────
const WASH_PHASES = [
  { key: 'standby', name: '待机', icon: 'mdi:power-standby', color: '#546e7a' },
  { key: 'preset',  name: '预约中', icon: 'mdi:clock-outline', color: '#78909c' },
  { key: 'prewash', name: '预洗', icon: 'mdi:water', color: '#29b6f6' },
  { key: 'wash',    name: '主洗', icon: 'mdi:waves', color: '#42a5f5' },
  { key: 'rinse',   name: '漂洗', icon: 'mdi:water-outline', color: '#66bb6a' },
  { key: 'spin',    name: '脱水', icon: 'mdi:refresh', color: '#ffa726' },
  { key: 'dry',     name: '烘干', icon: 'mdi:fire', color: '#ef5350' },
  { key: 'done',    name: '完成', icon: 'mdi:check-circle', color: '#66bb6a' },
  { key: 'error',   name: '故障', icon: 'mdi:alert-circle', color: '#f44336' },
];

// ─── 进度 → 阶段映射（根据 midea_auto_cloud 的 progress 属性） ──
function getPhaseFromProgress(progress, rawPhase) {
  // 如果有原始 phase 属性直接用
  if (rawPhase !== undefined && rawPhase !== null && rawPhase !== '') {
    const numPhase = parseInt(rawPhase, 10);
    if (!isNaN(numPhase)) {
      // 常见映射: 0=待机 1=预约 2=预洗 3=主洗 4=漂洗 5=脱水 6=烘干 7=完成 8=故障
      const mapped = WASH_PHASES[numPhase] || WASH_PHASES[0];
      return mapped;
    }
    // 字符串映射
    const strPhase = String(rawPhase).toLowerCase();
    const found = WASH_PHASES.find(p => p.key === strPhase);
    if (found) return found;
  }

  // 根据 progress 百分比推断
  if (progress <= 0) return WASH_PHASES[0]; // 待机
  if (progress > 0 && progress <= 15) return WASH_PHASES[2]; // 预洗
  if (progress > 15 && progress <= 50) return WASH_PHASES[3]; // 主洗
  if (progress > 50 && progress <= 75) return WASH_PHASES[4]; // 漂洗
  if (progress > 75 && progress <= 95) return WASH_PHASES[5]; // 脱水
  return WASH_PHASES[6]; // 完成/烘干
}

// ─── 格式化剩余时间 ─────────────────────────────────────────
function formatTime(val) {
  if (val === undefined || val === null || val === '' || val === '--') return '--';
  const num = parseInt(val, 10);
  if (isNaN(num)) return String(val);
  const h = Math.floor(num / 60);
  const m = num % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}`;
  return `${m} 分钟`;
}

// ─── 核心卡片组件 ─────────────────────────────────────────────
class MideaWasherCard extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _showModeSelector: { type: Boolean, state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        border-radius: 20px;
        overflow: hidden;
        background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        -webkit-tap-highlight-color: transparent;
        cursor: default;
      }

      .card-body {
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      /* ── 顶部标题栏 ── */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .header-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .header-left ha-icon {
        color: var(--midea-accent, #42a5f5);
        --mdi-icon-size: 22px;
      }
      .header-title {
        color: #e0e0e0;
        font-size: 16px;
        font-weight: 600;
      }
      .status-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 4px 12px;
      }
      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      .status-dot.active {
        animation: pulse 1.5s ease-in-out infinite;
      }
      .status-text {
        font-size: 12px;
        font-weight: 600;
      }

      /* ── 中间区域: 进度环 + 信息 ── */
      .body {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 20px;
      }
      .ring-wrap {
        position: relative;
        width: 120px;
        height: 120px;
        flex-shrink: 0;
      }
      .ring-wrap svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
      }
      .ring-bg {
        fill: none;
        stroke: rgba(255, 255, 255, 0.08);
        stroke-width: 7;
      }
      .ring-fill {
        fill: none;
        stroke-width: 7;
        stroke-linecap: round;
        transition: stroke-dashoffset 1s ease, stroke 0.5s ease;
      }
      .ring-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        pointer-events: none;
      }
      .ring-value {
        font-size: 28px;
        font-weight: 700;
        color: #fff;
        line-height: 1;
      }
      .ring-unit {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
      }

      .body-info {
        flex: 1;
        min-width: 0;
      }
      .phase-row {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 8px;
      }
      .phase-row ha-icon {
        --mdi-icon-size: 20px;
      }
      .phase-name {
        font-size: 18px;
        font-weight: 600;
        color: #fff;
      }
      .info-line {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
        margin-bottom: 4px;
      }
      .info-line span {
        color: #e0e0e0;
      }

      /* ── 阶段进度条 ── */
      .phases-bar {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        padding: 0 4px;
      }
      .phase-step {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        flex: 1;
      }
      .phase-dot {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(255, 255, 255, 0.1);
        transition: all 0.4s ease;
      }
      .phase-dot.active {
        border-color: var(--phase-color, #42a5f5);
        background: rgba(66, 165, 245, 0.2);
        box-shadow: 0 0 10px rgba(66, 165, 245, 0.3);
      }
      .phase-dot.done {
        border-color: #66bb6a;
        background: rgba(102, 187, 106, 0.2);
      }
      .phase-dot ha-icon {
        --mdi-icon-size: 16px;
        color: #546e7a;
        transition: color 0.4s ease;
      }
      .phase-dot.active ha-icon,
      .phase-dot.done ha-icon {
        color: var(--phase-color, #42a5f5);
      }
      .phase-dot.done ha-icon {
        --phase-color: #66bb6a;
        color: #66bb6a;
      }
      .phase-label {
        font-size: 10px;
        color: #546e7a;
        transition: color 0.4s ease;
      }
      .phase-step.active .phase-label {
        color: var(--phase-color, #42a5f5);
        font-weight: 600;
      }
      .phase-step.done .phase-label {
        color: #66bb6a;
      }
      .phase-conn {
        flex: 0.4;
        height: 2px;
        margin: 0 -4px;
        margin-bottom: 16px;
        background: rgba(255, 255, 255, 0.08);
        transition: background 0.4s ease;
      }
      .phase-conn.done {
        background: #66bb6a;
      }

      /* ── 属性网格 ── */
      .attr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 16px;
      }
      .attr-item {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
      .attr-item:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .attr-item ha-icon {
        --mdi-icon-size: 18px;
        flex-shrink: 0;
      }
      .attr-text {
        min-width: 0;
      }
      .attr-label {
        color: rgba(255, 255, 255, 0.5);
        font-size: 11px;
      }
      .attr-value {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* ── 模式选择弹层 ── */
      .mode-selector {
        margin-bottom: 16px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }
      .mode-selector-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.2s ease;
      }
      .mode-selector-header:hover {
        background: rgba(255, 255, 255, 0.05);
      }
      .mode-selector-header ha-icon {
        --mdi-icon-size: 18px;
        color: #78909c;
      }
      .mode-selector-header .current-mode {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
      }
      .mode-selector-header .label {
        color: rgba(255, 255, 255, 0.6);
        font-size: 13px;
      }
      .mode-selector-header .arrow {
        color: #78909c;
        --mdi-icon-size: 16px;
        transition: transform 0.3s ease;
      }
      .mode-selector-header .arrow.open {
        transform: rotate(180deg);
      }
      .mode-options {
        display: none;
        flex-direction: column;
        gap: 2px;
        padding: 0 8px 8px;
      }
      .mode-options.open {
        display: flex;
      }
      .mode-option {
        padding: 8px 12px;
        border-radius: 8px;
        color: #e0e0e0;
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .mode-option:hover {
        background: rgba(255, 255, 255, 0.08);
      }
      .mode-option.selected {
        background: rgba(66, 165, 245, 0.2);
        color: #42a5f5;
        font-weight: 600;
      }

      /* ── 控制按钮 ── */
      .controls {
        display: flex;
        gap: 8px;
      }
      .ctrl-btn {
        flex: 1;
        padding: 12px 0;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        transition: all 0.3s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .ctrl-btn ha-icon {
        --mdi-icon-size: 18px;
      }
      .ctrl-btn:active {
        transform: scale(0.96);
      }
      .ctrl-btn.power-off {
        background: rgba(66, 165, 245, 0.15);
        color: #42a5f5;
      }
      .ctrl-btn.power-off:hover {
        background: rgba(66, 165, 245, 0.25);
      }
      .ctrl-btn.power-on {
        background: rgba(255, 82, 82, 0.15);
        color: #ff5252;
      }
      .ctrl-btn.power-on:hover {
        background: rgba(255, 82, 82, 0.25);
      }
      .ctrl-btn.start {
        background: rgba(76, 175, 80, 0.15);
        color: #4caf50;
      }
      .ctrl-btn.start:hover {
        background: rgba(76, 175, 80, 0.25);
      }
      .ctrl-btn.pause {
        background: rgba(255, 167, 38, 0.15);
        color: #ffa726;
      }
      .ctrl-btn.pause:hover {
        background: rgba(255, 167, 38, 0.25);
      }
      .ctrl-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      /* ── 离线提示 ── */
      .offline-msg {
        text-align: center;
        padding: 32px 20px;
        color: #78909c;
      }
      .offline-msg ha-icon {
        --mdi-icon-size: 48px;
        color: #37474f;
      }
      .offline-msg p {
        margin-top: 12px;
        font-size: 14px;
      }

      /* ── 动画 ── */
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .spinning {
        animation: spin 2s linear infinite;
      }
    `;
  }

  // ── 配置 ──────────────────────────────────────────────────────
  setConfig(config) {
    if (!config.entity) {
      throw new Error('请指定 entity (binary_sensor.xxxx_status)');
    }
    this.config = {
      entity: config.entity,
      // 可选：手动指定关联实体（不指定则自动探测）
      power_entity: config.power_entity || '',
      start_pause_entity: config.start_pause_entity || '',
      mode_entity: config.mode_entity || '',
      // 可选：门状态 & 水温报警（midea_auto_cloud 集成的额外实体）
      door_entity: config.door_entity || '',
      water_overheating_entity: config.water_overheating_entity || '',
      // 可选：自定义标题
      title: config.title || '',
      // 可选：自定义属性映射
      attr_progress: config.attr_progress || 'progress',
      attr_time_remaining: config.attr_time_remaining || 'time_remaining',
      attr_wash_mode: config.attr_wash_mode || 'wash_mode',
      attr_temperature: config.attr_temperature || 'temperature',
      attr_spin_speed: config.attr_spin_speed || 'spin_speed',
      attr_water_level: config.attr_water_level || 'water_level',
      attr_phase: config.attr_phase || 'job_phase',
      // 可选：自定义属性显示（额外属性行）
      extra_attrs: config.extra_attrs || [],
    };
    this._showModeSelector = false;
  }

  // ── 获取实体状态 ─────────────────────────────────────────────
  get _entity() {
    return this.config?.entity || '';
  }

  get _state() {
    return this.hass?.states[this._entity];
  }

  get _attrs() {
    return this._state?.attributes || {};
  }

  get _isOn() {
    return this._state?.state === 'on';
  }

  // 自动探测关联实体
  get _devicePrefix() {
    // 从 status 实体名推算，如 binary_sensor.midea_1234_status → midea_1234
    const name = this._entity.replace('binary_sensor.', '').replace(/_status$/, '');
    return name;
  }

  // 获取真实的设备前缀（处理 HA 自动重命名的情况）
  // 当 status 实体被 HA 自动重命名（如 chu_fang_gun_tong_xi_yi_ji_she_bei_zhuang_tai）
  // 而其他实体仍用原始数字 ID（如 177021372257246）时，需要推算出真实前缀
  get _realDevicePrefix() {
    // 先尝试标准前缀
    const standardPrefix = this._devicePrefix;
    const allEntities = Object.keys(this.hass?.states || {});

    // 检查标准前缀是否能找到关联实体
    const hasMatch = allEntities.some(eid => {
      const objName = eid.split('.').slice(1).join('.'); // 去掉 domain 前缀
      return objName.startsWith(standardPrefix + '_');
    });
    if (hasMatch) return standardPrefix;

    // 标准前缀不匹配，尝试从其他实体推算真实数字 ID 前缀
    // 策略1：搜索所有实体，找到与 status 实体共享 friendly_name 前缀的实体
    const statusFriendlyName = (this._attrs?.friendly_name || '').toLowerCase();

    // 策略2：搜索包含长数字 ID 的实体（美的设备的典型命名模式）
    const numericIdPattern = /^\d{10,}$/; // 至少10位数字的设备 ID
    const entityPrefixCounts = {};

    for (const eid of allEntities) {
      // 提取实体名中的数字 ID 前缀
      const match = eid.match(/\.(\d{10,})_/);
      if (match) {
        const numPrefix = match[1];
        entityPrefixCounts[numPrefix] = (entityPrefixCounts[numPrefix] || 0) + 1;
      }
    }

    // 找到出现次数最多的数字 ID 前缀（很可能就是同一设备的实体集合）
    // 优先匹配与 status 实体 friendly_name 相关的
    // 但最简单的方式：对于只有一个美的设备的情况，直接返回最常出现的数字前缀
    const sorted = Object.entries(entityPrefixCounts).sort((a, b) => b[1] - a[1]);
    if (sorted.length > 0) {
      return sorted[0][0]; // 返回出现最多的数字 ID
    }

    // 兜底：返回标准前缀
    return standardPrefix;
  }

  _findEntity(suffix) {
    // 优先使用手动指定的
    if (this.config[suffix + '_entity']) return this.config[suffix + '_entity'];

    const allEntities = Object.keys(this.hass?.states || {});

    // 自动探测方式1：基于标准前缀
    const standardPrefix = this._devicePrefix;
    const candidates1 = this._buildCandidates(standardPrefix, suffix);
    for (const eid of candidates1) {
      if (this.hass?.states[eid] !== undefined) return eid;
    }

    // 自动探测方式2：基于真实设备前缀（处理 HA 自动重命名的情况）
    const realPrefix = this._realDevicePrefix;
    if (realPrefix !== standardPrefix) {
      const candidates2 = this._buildCandidates(realPrefix, suffix);
      for (const eid of candidates2) {
        if (this.hass?.states[eid] !== undefined) return eid;
      }
    }

    // 自动探测方式3：全局后缀搜索（兜底）
    // 搜索所有实体，按后缀匹配
    const suffixPatterns = this._getSuffixPatterns(suffix);
    for (const pattern of suffixPatterns) {
      const found = allEntities.find(eid => {
        const objName = eid.split('.').slice(1).join('.');
        return objName === pattern || objName.endsWith('_' + pattern);
      });
      if (found) return found;
    }

    return '';
  }

  _buildCandidates(prefix, suffix) {
    const candidates = [
      `${prefix}_${suffix}`,
      `${prefix}.${suffix}`,
    ];
    // 也尝试常见的命名变体
    if (suffix === 'power') {
      candidates.push(`${prefix}_power`, `${prefix}_switch_power`, `switch.${prefix}_power`, `switch.${prefix}`);
    }
    if (suffix === 'start_pause') {
      candidates.push(`${prefix}_start_pause`, `${prefix}_start`, `switch.${prefix}_start_pause`, `switch.${prefix}_start`);
    }
    if (suffix === 'wash_mode' || suffix === 'mode') {
      candidates.push(`${prefix}_wash_mode`, `${prefix}_mode`, `select.${prefix}_wash_mode`, `select.${prefix}_mode`);
    }
    if (suffix === 'door_status') {
      candidates.push(`${prefix}_door_status`, `${prefix}_door`, `binary_sensor.${prefix}_door_status`, `binary_sensor.${prefix}_door`);
    }
    if (suffix === 'bucket_water_overheating' || suffix === 'water_overheating') {
      candidates.push(`${prefix}_bucket_water_overheating`, `${prefix}_water_overheating`, `binary_sensor.${prefix}_bucket_water_overheating`, `binary_sensor.${prefix}_water_overheating`);
    }
    return candidates;
  }

  _getSuffixPatterns(suffix) {
    // 全局搜索时用的后缀模式
    if (suffix === 'power') return ['power'];
    if (suffix === 'start_pause') return ['start_pause', 'start'];
    if (suffix === 'wash_mode' || suffix === 'mode') return ['wash_mode', 'mode'];
    if (suffix === 'door_status') return ['door_status', 'door'];
    if (suffix === 'bucket_water_overheating' || suffix === 'water_overheating') return ['bucket_water_overheating', 'water_overheating'];
    return [suffix];
  }

  get _powerEntity() {
    return this._findEntity('power');
  }

  get _startPauseEntity() {
    return this._findEntity('start_pause');
  }

  get _modeEntity() {
    return this._findEntity('wash_mode') || this._findEntity('mode');
  }

  get _doorEntity() {
    return this._findEntity('door_status');
  }

  get _waterOverheatingEntity() {
    return this._findEntity('bucket_water_overheating') || this._findEntity('water_overheating');
  }

  // ── 读取属性值 ────────────────────────────────────────────────
  get _progress() {
    return parseFloat(this._attrs[this.config.attr_progress]) || 0;
  }

  get _timeRemaining() {
    const val = this._attrs[this.config.attr_time_remaining] || this._attrs['remaining_time'] || this._attrs['time_left'];
    return formatTime(val);
  }

  get _washMode() {
    return this._attrs[this.config.attr_wash_mode] || this._attrs['mode'] || '--';
  }

  get _temperature() {
    return this._attrs[this.config.attr_temperature] || this._attrs['temp'] || '--';
  }

  get _spinSpeed() {
    return this._attrs[this.config.attr_spin_speed] || this._attrs['spin'] || '--';
  }

  get _waterLevel() {
    return this._attrs[this.config.attr_water_level] || '--';
  }

  get _phase() {
    const rawPhase = this._attrs[this.config.attr_phase] || this._attrs['phase'];
    return getPhaseFromProgress(this._progress, rawPhase);
  }

  get _isRunning() {
    const sp = this.hass?.states[this._startPauseEntity];
    return this._isOn && sp?.state === 'on';
  }

  get _modeOptions() {
    const me = this.hass?.states[this._modeEntity];
    if (!me) return [];
    return me.attributes?.options || [];
  }

  // ── 服务调用 ──────────────────────────────────────────────────
  _callService(domain, service, entityId) {
    if (!this.hass || !entityId) return;
    this.hass.callService(domain, service, { entity_id: entityId });
  }

  _togglePower() {
    this._callService('switch', 'toggle', this._powerEntity);
  }

  _toggleStartPause() {
    this._callService('switch', 'toggle', this._startPauseEntity);
  }

  _selectMode(mode) {
    if (!this._modeEntity) return;
    this._callService('select', 'select_option', this._modeEntity);
    // select_option 需要 option 参数
    this.hass.callService('select', 'select_option', {
      entity_id: this._modeEntity,
      option: mode,
    });
    this._showModeSelector = false;
  }

  _toggleModeSelector() {
    this._showModeSelector = !this._showModeSelector;
  }

  // ── 渲染 ──────────────────────────────────────────────────────
  render() {
    if (!this._state) {
      return html`
        <ha-card>
          <div class="offline-msg">
            <ha-icon icon="mdi:washing-machine"></ha-icon>
            <p>未找到实体: ${this._entity}</p>
            <p style="font-size:12px;color:#546e7a;margin-top:4px;">请检查卡片配置中的 entity 是否正确</p>
          </div>
        </ha-card>
      `;
    }

    const isOn = this._isOn;
    const isRunning = this._isRunning;
    const progress = this._progress;
    const phase = this._phase;
    const statusColor = isOn ? (isRunning ? '#42a5f5' : '#ffa726') : '#78909c';
    const statusText = !isOn ? '待机' : (isRunning ? '洗涤中' : '已暂停');

    // 进度环参数
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (progress / 100) * circumference;

    // 阶段进度条
    const visiblePhases = [
      WASH_PHASES[2], // 预洗
      WASH_PHASES[3], // 主洗
      WASH_PHASES[4], // 漂洗
      WASH_PHASES[5], // 脱水
    ];
    const currentPhaseIdx = visiblePhases.findIndex(p => p.key === phase.key);

    // 模式选项
    const modeOptions = this._modeOptions;
    const currentMode = this._washMode;

    // 额外属性
    const extraAttrs = this.config.extra_attrs || [];

    // 门状态 & 水温报警
    const doorEntity = this._doorEntity;
    const doorState = doorEntity ? this.hass?.states[doorEntity] : null;
    const doorOpen = doorState?.state === 'on';
    const waterOverheatingEntity = this._waterOverheatingEntity;
    const waterState = waterOverheatingEntity ? this.hass?.states[waterOverheatingEntity] : null;
    const waterOverheating = waterState?.state === 'on';

    return html`
      <ha-card>
        <div class="card-body">

          <!-- 顶部标题 -->
          <div class="header">
            <div class="header-left">
              <ha-icon icon="mdi:washing-machine" style="color:${statusColor}"></ha-icon>
              <span class="header-title">${this.config.title || '美的洗衣机'}</span>
            </div>
            <div class="status-badge">
              <div class="status-dot ${isOn ? 'active' : ''}" style="background:${statusColor}"></div>
              <span class="status-text" style="color:${statusColor}">${statusText}</span>
            </div>
          </div>

          <!-- 进度环 + 信息 -->
          <div class="body">
            <div class="ring-wrap">
              <svg viewBox="0 0 120 120">
                <circle class="ring-bg" cx="60" cy="60" r="${radius}"></circle>
                <circle class="ring-fill" cx="60" cy="60" r="${radius}"
                  stroke="${phase.color}"
                  stroke-dasharray="${circumference}"
                  stroke-dashoffset="${dashOffset}">
                </circle>
              </svg>
              <div class="ring-center">
                <div class="ring-value">${Math.round(progress)}<span class="ring-unit">%</span></div>
              </div>
            </div>
            <div class="body-info">
              <div class="phase-row">
                <ha-icon icon="${phase.icon}" style="color:${phase.color}" class="${isRunning && phase.key === 'wash' ? 'spinning' : ''}"></ha-icon>
                <span class="phase-name" style="color:${phase.color}">${phase.name}</span>
              </div>
              <div class="info-line">模式: <span>${currentMode}</span></div>
              <div class="info-line">剩余: <span>${this._timeRemaining}</span></div>
            </div>
          </div>

          <!-- 阶段进度条 -->
          ${isOn ? html`
          <div class="phases-bar">
            ${visiblePhases.map((p, i) => {
              const isDone = currentPhaseIdx > i;
              const isActive = currentPhaseIdx === i;
              return html`
                <div class="phase-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}" style="--phase-color:${p.color}">
                  <div class="phase-dot ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}">
                    <ha-icon icon="${p.icon}"></ha-icon>
                  </div>
                  <span class="phase-label">${p.name}</span>
                </div>
                ${i < visiblePhases.length - 1 ? html`
                  <div class="phase-conn ${isDone ? 'done' : ''}"></div>
                ` : ''}
              `;
            })}
          </div>
          ` : ''}

          <!-- 属性网格 -->
          <div class="attr-grid">
            <div class="attr-item">
              <ha-icon icon="mdi:thermometer" style="color:#ef5350"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">温度</div>
                <div class="attr-value">${this._temperature}</div>
              </div>
            </div>
            <div class="attr-item">
              <ha-icon icon="mdi:rotate-3d-variant" style="color:#42a5f5"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">转速</div>
                <div class="attr-value">${this._spinSpeed}</div>
              </div>
            </div>
            <div class="attr-item">
              <ha-icon icon="mdi:water" style="color:#29b6f6"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">水位</div>
                <div class="attr-value">${this._waterLevel}</div>
              </div>
            </div>
            <div class="attr-item">
              <ha-icon icon="mdi:clock-outline" style="color:#ffa726"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">剩余时间</div>
                <div class="attr-value">${this._timeRemaining}</div>
              </div>
            </div>
            ${doorState ? html`
            <div class="attr-item" style="${doorOpen ? 'background:rgba(255,152,0,0.15);border:1px solid rgba(255,152,0,0.3)' : ''}">
              <ha-icon icon="${doorOpen ? 'mdi:door-open' : 'mdi:door-closed'}" style="color:${doorOpen ? '#ff9800' : '#66bb6a'}"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">门状态</div>
                <div class="attr-value" style="color:${doorOpen ? '#ff9800' : '#66bb6a'}">${doorOpen ? '已开门' : '已关门'}</div>
              </div>
            </div>
            ` : ''}
            ${waterState ? html`
            <div class="attr-item" style="${waterOverheating ? 'background:rgba(244,67,54,0.15);border:1px solid rgba(244,67,54,0.3)' : ''}">
              <ha-icon icon="mdi:thermometer-alert" style="color:${waterOverheating ? '#f44336' : '#66bb6a'}"></ha-icon>
              <div class="attr-text">
                <div class="attr-label">水温</div>
                <div class="attr-value" style="color:${waterOverheating ? '#f44336' : '#66bb6a'}">${waterOverheating ? '过热报警' : '正常'}</div>
              </div>
            </div>
            ` : ''}
            ${extraAttrs.map(attr => html`
              <div class="attr-item">
                <ha-icon icon="${attr.icon || 'mdi:information-outline'}" style="color:${attr.color || '#78909c'}"></ha-icon>
                <div class="attr-text">
                  <div class="attr-label">${attr.label || attr.attr}</div>
                  <div class="attr-value">${this._attrs[attr.attr] || '--'}</div>
                </div>
              </div>
            `)}
          </div>

          <!-- 模式选择器 -->
          ${modeOptions.length > 0 ? html`
          <div class="mode-selector">
            <div class="mode-selector-header" @click=${this._toggleModeSelector}>
              <div style="display:flex;align-items:center;gap:8px;">
                <ha-icon icon="mdi:tune-variant"></ha-icon>
                <span class="label">洗涤模式</span>
                <span class="current-mode">${currentMode}</span>
              </div>
              <ha-icon icon="mdi:chevron-down" class="arrow ${this._showModeSelector ? 'open' : ''}"></ha-icon>
            </div>
            <div class="mode-options ${this._showModeSelector ? 'open' : ''}">
              ${modeOptions.map(opt => html`
                <div class="mode-option ${opt === currentMode ? 'selected' : ''}"
                  @click=${() => this._selectMode(opt)}>
                  ${opt}
                </div>
              `)}
            </div>
          </div>
          ` : ''}

          <!-- 控制按钮 -->
          <div class="controls">
            ${isOn ? html`
              <button class="ctrl-btn power-on" @click=${this._togglePower}>
                <ha-icon icon="mdi:power"></ha-icon>
                关机
              </button>
              <button class="ctrl-btn ${isRunning ? 'pause' : 'start'}"
                @click=${this._toggleStartPause}>
                <ha-icon icon="${isRunning ? 'mdi:pause' : 'mdi:play'}"></ha-icon>
                ${isRunning ? '暂停' : '启动'}
              </button>
            ` : html`
              <button class="ctrl-btn power-off" @click=${this._togglePower}
                ?disabled=${!this._powerEntity}>
                <ha-icon icon="mdi:power"></ha-icon>
                开机
              </button>
            `}
          </div>

        </div>
      </ha-card>
    `;
  }

  // ── HA 卡片注册必需 ───────────────────────────────────────────
  getCardSize() {
    return 4;
  }

  static getConfigElement() {
    return document.createElement('midea-washer-card-editor');
  }
}

// ─── 配置编辑器 ───────────────────────────────────────────────
class MideaWasherCardEditor extends LitElement {

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  setConfig(config) {
    this.config = config;
  }

  _valueChanged(ev) {
    if (!this.config || !this.hass) return;
    const target = ev.target;
    if (target.configValue) {
      this.config = {
        ...this.config,
        [target.configValue]: target.value,
      };
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;

    // 自动查找 status 实体
    // 同时支持原始命名（xxxx_status）和 HA 自动重命名（如 chu_fang_gun_tong_xi_yi_ji_she_bei_zhuang_tai）
    const statusEntities = Object.keys(this.hass.states)
      .filter(eid => {
        if (!eid.startsWith('binary_sensor.')) return false;
        const name = eid.replace('binary_sensor.', '');
        // 匹配 _status 后缀（原始命名）
        if (name.endsWith('_status')) return true;
        // 匹配 _zhuang_tai 后缀（HA 中文自动重命名"状态"）
        if (name.endsWith('_zhuang_tai')) return true;
        // 匹配 _she_bei_zhuang_tai 后缀（HA 中文自动重命名"设备状态"）
        if (name.endsWith('_she_bei_zhuang_tai')) return true;
        // 匹配 device_class 为 running 的 binary_sensor（美的设备状态）
        const state = this.hass.states[eid];
        if (state?.attributes?.device_class === 'running') return true;
        return false;
      })
      .sort();

    return html`
      <style>
        .editor { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
        .field { display: flex; flex-direction: column; gap: 4px; }
        .field label { font-size: 12px; color: var(--secondary-text-color); font-weight: 500; }
        .field input, .field select {
          padding: 8px 12px;
          border: 1px solid var(--divider-color);
          border-radius: 8px;
          background: var(--card-background-color);
          color: var(--primary-text-color);
          font-size: 14px;
        }
      </style>
      <div class="editor">
        <div class="field">
          <label>状态实体 (必填)</label>
          <select .value=${this.config.entity || ''} configValue="entity" @change=${this._valueChanged}>
            <option value="">-- 选择 Status 实体 --</option>
            ${statusEntities.map(eid => html`
              <option value="${eid}" ?selected=${this.config.entity === eid}>${eid}</option>
            `)}
          </select>
        </div>
        <div class="field">
          <label>电源开关实体 (可选，留空自动探测)</label>
          <input type="text" .value=${this.config.power_entity || ''} configValue="power_entity"
            @input=${this._valueChanged} placeholder="switch.xxxx_power">
        </div>
        <div class="field">
          <label>启动/暂停实体 (可选)</label>
          <input type="text" .value=${this.config.start_pause_entity || ''} configValue="start_pause_entity"
            @input=${this._valueChanged} placeholder="switch.xxxx_start_pause">
        </div>
        <div class="field">
          <label>模式选择实体 (可选)</label>
          <input type="text" .value=${this.config.mode_entity || ''} configValue="mode_entity"
            @input=${this._valueChanged} placeholder="select.xxxx_wash_mode">
        </div>
        <div class="field">
          <label>门状态实体 (可选，留空自动探测)</label>
          <input type="text" .value=${this.config.door_entity || ''} configValue="door_entity"
            @input=${this._valueChanged} placeholder="binary_sensor.xxxx_door_status">
        </div>
        <div class="field">
          <label>水温过热实体 (可选)</label>
          <input type="text" .value=${this.config.water_overheating_entity || ''} configValue="water_overheating_entity"
            @input=${this._valueChanged} placeholder="binary_sensor.xxxx_bucket_water_overheating">
        </div>
        <div class="field">
          <label>卡片标题 (可选)</label>
          <input type="text" .value=${this.config.title || ''} configValue="title"
            @input=${this._valueChanged} placeholder="美的洗衣机">
        </div>
      </div>
    `;
  }
}

// ─── 注册 ──────────────────────────────────────────────────────
customElements.define('midea-washer-card', MideaWasherCard);
customElements.define('midea-washer-card-editor', MideaWasherCardEditor);

// HA 自动发现注册
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'midea-washer-card',
  name: 'Midea Washer Card',
  description: '美的洗衣机状态卡片 (midea_auto_cloud)',
  documentationURL: 'https://github.com/tiejiang29/midea-washer-card',
});
