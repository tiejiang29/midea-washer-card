# Midea Washer Card

Home Assistant 自定义卡片，专为 [midea_auto_cloud](https://github.com/sususweet/midea_auto_cloud) 集成设计的美的洗衣机状态显示与控制卡片。

基于 `binary_sensor.xxxx_status` 实体的属性自动读取洗衣机状态，支持远程控制。

## ✨ 功能特性

- 🔄 **圆形进度环** — 实时显示洗涤进度百分比
- 📊 **阶段进度条** — 预洗 → 主洗 → 漂洗 → 脱水 四阶段可视化
- 📋 **属性详情网格** — 温度、转速、水位、剩余时间一目了然
- 🚪 **门状态显示** — 实时显示洗衣机门开关状态（需对应实体）
- 🌡️ **水温报警** — 水温过热时红色高亮报警（需对应实体）
- 🎛️ **模式选择** — 下拉选择洗涤模式（基于 select 实体）
- ⚡ **远程控制** — 开关机、启动/暂停按钮
- 🔍 **智能自动探测** — 三级探测策略：标准前缀 → 真实设备ID → 全局后缀匹配
- 🎨 **深色主题** — 精心设计的渐变背景与状态动画
- ✏️ **可视化配置** — HA 内置卡片编辑器，下拉选择实体

## 📦 安装

### 方法一：HACS（推荐）

1. 在 HACS → 前端 中点击右上角三个点 → 自定义仓库
2. 添加本仓库地址
3. 搜索 "Midea Washer Card" 并安装
4. 重启 Home Assistant

### 方法二：手动安装

1. 下载 [`dist/midea-washer-card.js`](dist/midea-washer-card.js)
2. 将文件复制到 HA 配置目录下的 `www/community/midea-washer-card/midea-washer-card.js`
3. 在 `configuration.yaml` 或仪表盘资源中添加：

```yaml
# configuration.yaml 方式
frontend:
  extra_module_url:
    - /community/midea-washer-card/midea-washer-card.js

# 或者通过 仪表盘 → 配置资源 添加
# URL: /community/midea-washer-card/midea-washer-card.js
# 类型: JavaScript Module
```

4. 重启 Home Assistant（或刷新浏览器缓存 Ctrl+Shift+R）

## ⚙️ 配置

在仪表盘中添加卡片，选择 **Midea Washer Card** (custom:midea-washer-card)：

### 最简配置

只需指定 status 实体，其余自动探测：

```yaml
type: custom:midea-washer-card
entity: binary_sensor.midea_washer_status
```

> 💡 **HA 自动重命名提示**：如果你的状态实体被 HA 自动重命名（如 `binary_sensor.chu_fang_gun_tong_xi_yi_ji_she_bei_zhuang_tai`），卡片也能自动识别并探测关联实体，详见下方[自动探测规则](#自动探测规则)。

### 完整配置

```yaml
type: custom:midea-washer-card
entity: binary_sensor.chu_fang_gun_tong_xi_yi_ji_she_bei_zhuang_tai  # 必填：Status 实体
title: 我的洗衣机                               # 可选：卡片标题（默认"美的洗衣机"）
power_entity: switch.177021372257246_power       # 可选：电源开关（留空自动探测）
start_pause_entity: switch.177021372257246_start_pause  # 可选：启动/暂停
mode_entity: select.177021372257246_wash_mode    # 可选：模式选择
door_entity: binary_sensor.177021372257246_door_status  # 可选：门状态（留空自动探测）
water_overheating_entity: binary_sensor.177021372257246_bucket_water_overheating  # 可选：水温过热

# 属性名映射（如果你的集成属性名不同）
attr_progress: progress          # 进度属性名（默认 progress）
attr_time_remaining: time_remaining  # 剩余时间属性名
attr_wash_mode: wash_mode        # 模式属性名
attr_temperature: temperature    # 温度属性名
attr_spin_speed: spin_speed      # 转速属性名
attr_water_level: water_level    # 水位属性名
attr_phase: job_phase            # 阶段属性名

# 额外显示的属性
extra_attrs:
  - attr: rinse_count
    label: 漂洗次数
    icon: mdi:refresh
    color: '#66bb6a'
  - attr: error_code
    label: 错误码
    icon: mdi:alert
    color: '#f44336'
```

### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `entity` | string | ✅ | — | Status 二值传感器实体 |
| `title` | string | ❌ | 美的洗衣机 | 卡片标题 |
| `power_entity` | string | ❌ | 自动探测 | 电源开关实体 |
| `start_pause_entity` | string | ❌ | 自动探测 | 启动/暂停实体 |
| `mode_entity` | string | ❌ | 自动探测 | 模式选择实体 |
| `door_entity` | string | ❌ | 自动探测 | 门状态实体 |
| `water_overheating_entity` | string | ❌ | 自动探测 | 水温过热报警实体 |
| `attr_*` | string | ❌ | 见上表 | 属性名映射 |
| `extra_attrs` | array | ❌ | [] | 额外显示的属性行 |

## 🔍 如何找到你的实体

1. 在 HA 中进入 **开发者工具 → 状态**
2. 搜索 `midea` 或你的设备名称
3. 找到状态实体，它可能叫：
   - `binary_sensor.xxxx_status`（原始命名）
   - `binary_sensor.xxxx_she_bei_zhuang_tai`（HA 自动重命名为中文拼音"设备状态"）
   - `binary_sensor.xxxx_zhuang_tai`（HA 自动重命名为中文拼音"状态"）
4. 点击展开查看其 **属性(Attributes)** 列表，这就是卡片读取的数据源
5. 关联的控制实体会自动探测，也可手动指定

### 自动探测规则

卡片使用**三级探测策略**自动查找关联实体：

**第一级：标准前缀匹配**

根据 Status 实体名推算前缀，直接拼接：

```
binary_sensor.midea_abc123_status
  → switch.midea_abc123_power
  → switch.midea_abc123_start_pause
  → select.midea_abc123_wash_mode
  → binary_sensor.midea_abc123_door_status
  → binary_sensor.midea_abc123_bucket_water_overheating
```

**第二级：真实设备 ID 探测**

当 Status 实体被 HA 自动重命名时，标准前缀匹配会失败。卡片会扫描所有 HA 实体，提取数字设备 ID 前缀（如 `177021372257246`），然后用真实 ID 重新匹配：

```
binary_sensor.chu_fang_gun_tong_xi_yi_ji_she_bei_zhuang_tai  (被重命名)
  → 自动发现设备 ID: 177021372257246
  → switch.177021372257246_power ✅
  → switch.177021372257246_start_pause ✅
  → binary_sensor.177021372257246_door_status ✅
  → binary_sensor.177021372257246_bucket_water_overheating ✅
```

**第三级：全局后缀搜索**

如果前两级都未找到，则搜索所有实体，按后缀匹配（如 `_power`、`_door_status`）。

> 💡 如果自动探测匹配到了错误设备（你有多台美的设备），请手动指定 `power_entity` 等参数。

## 🎨 界面说明

### 状态显示

| 状态 | 颜色 | 说明 |
|------|------|------|
| 待机 | 灰色 | 洗衣机关机或离线 |
| 洗涤中 | 蓝色 | 正在运行，呼吸灯动画 |
| 已暂停 | 橙色 | 已暂停运行 |

### 门状态 & 水温报警

| 状态 | 颜色 | 说明 |
|------|------|------|
| 已关门 | 绿色 | 门已关闭，可以运行 |
| 已开门 | 橙色 | 门已打开，带高亮边框 |
| 水温正常 | 绿色 | 水温在正常范围 |
| 水温过热 | 红色 | 水温过热报警，带红色边框 |

### 洗涤阶段

根据 `progress` 属性和 `job_phase` 属性自动判断：

| 阶段 | 进度范围 | 颜色 |
|------|----------|------|
| 预洗 | 1-15% | 浅蓝 |
| 主洗 | 16-50% | 蓝色 |
| 漂洗 | 51-75% | 绿色 |
| 脱水 | 76-95% | 橙色 |

## 🛠️ 前置依赖

- [midea_auto_cloud](https://github.com/sususweet/midea_auto_cloud) 集成
- Home Assistant 2023.1 或更高版本

## 📝 常见问题

**Q: 卡片显示"未找到实体"？**
A: 检查 `entity` 配置是否正确，确认 midea_auto_cloud 集成已正确添加设备。注意实体可能被 HA 自动重命名，可在开发者工具中搜索"状态"或"zhuang_tai"找到。

**Q: 控制按钮不显示/不可用？**
A: 卡片会自动探测关联实体，但如果你的 Status 实体被重命名且有多台美的设备，自动探测可能匹配错误。请在配置中手动指定 `power_entity`、`start_pause_entity`。

**Q: 属性值显示 -- ？**
A: Status 实体的属性名可能因设备型号不同而有差异，使用 `attr_*` 参数自定义属性名映射。

**Q: 模式选择不显示？**
A: 模式选择需要 `select.xxxx_wash_mode` 实体存在。检查你的集成是否生成了该实体。

**Q: 编辑器下拉框找不到我的 Status 实体？**
A: 卡片编辑器会自动列出以 `_status`、`_zhuang_tai`（状态）、`_she_bei_zhuang_tai`（设备状态）结尾的 binary_sensor 实体。如果仍找不到，可以手动输入实体 ID。

**Q: 门状态/水温不显示？**
A: 这两个需要对应的实体存在。卡片会自动探测，也可通过 `door_entity` 和 `water_overheating_entity` 手动指定。

## License

MIT
