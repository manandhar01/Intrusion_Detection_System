const capturedArrayFormat =
    "dst_port,flow_duration,flow_byts_s,flow_pkts_s,fwd_pkts_s,bwd_pkts_s,tot_fwd_pkts,tot_bwd_pkts,totlen_fwd_pkts,totlen_bwd_pkts,fwd_pkt_len_max,fwd_pkt_len_min,fwd_pkt_len_mean,fwd_pkt_len_std,bwd_pkt_len_max,bwd_pkt_len_min,bwd_pkt_len_mean,bwd_pkt_len_std,pkt_len_max,pkt_len_min,pkt_len_mean,pkt_len_std,pkt_len_var,fwd_header_len,bwd_header_len,fwd_seg_size_min,fwd_act_data_pkts,flow_iat_mean,flow_iat_max,flow_iat_min,flow_iat_std,fwd_iat_tot,fwd_iat_max,fwd_iat_min,fwd_iat_mean,fwd_iat_std,bwd_iat_tot,bwd_iat_max,bwd_iat_min,bwd_iat_mean,bwd_iat_std,fwd_psh_flags,bwd_psh_flags,fwd_urg_flags,bwd_urg_flags,fin_flag_cnt,syn_flag_cnt,rst_flag_cnt,psh_flag_cnt,ack_flag_cnt,urg_flag_cnt,ece_flag_cnt,down_up_ratio,pkt_size_avg,init_fwd_win_byts,init_bwd_win_byts,active_max,active_min,active_mean,active_std,idle_max,idle_min,idle_mean,idle_std,fwd_byts_b_avg,fwd_pkts_b_avg,bwd_byts_b_avg,bwd_pkts_b_avg,fwd_blk_rate_avg,bwd_blk_rate_avg,fwd_seg_size_avg,bwd_seg_size_avg,cwe_flag_count,subflow_fwd_pkts,subflow_bwd_pkts,subflow_fwd_byts,subflow_bwd_byts".split(
        ","
    );
const requiredArrayFormat =
    "Destination_Port,Flow_Duration,Total_Fwd_Packets,Total_Backward_Packets,Total_Length_of_Fwd_Packets,Total_Length_of_Bwd_Packets,Fwd_Packet_Length_Max,Fwd_Packet_Length_Min,Fwd_Packet_Length_Mean,Fwd_Packet_Length_Std,Bwd_Packet_Length_Max,Bwd_Packet_Length_Min,Bwd_Packet_Length_Mean,Bwd_Packet_Length_Std,Flow_Bytes/s,Flow_Packets/s,Flow_IAT_Mean,Flow_IAT_Std,Flow_IAT_Max,Flow_IAT_Min,Fwd_IAT_Total,Fwd_IAT_Mean,Fwd_IAT_Std,Fwd_IAT_Max,Fwd_IAT_Min,Bwd_IAT_Total,Bwd_IAT_Mean,Bwd_IAT_Std,Bwd_IAT_Max,Bwd_IAT_Min,Fwd_PSH_Flags,Bwd_PSH_Flags,Fwd_URG_Flags,Bwd_URG_Flags,Fwd_Header_Length,Bwd_Header_Length,Fwd_Packets/s,Bwd_Packets/s,Min_Packet_Length,Max_Packet_Length,Packet_Length_Mean,Packet_Length_Std,Packet_Length_Variance,FIN_Flag_Count,SYN_Flag_Count,RST_Flag_Count,PSH_Flag_Count,ACK_Flag_Count,URG_Flag_Count,CWE_Flag_Count,ECE_Flag_Count,Down/Up_Ratio,Average_Packet_Size,Avg_Fwd_Segment_Size,Avg_Bwd_Segment_Size,Fwd_Avg_Bytes/Bulk,Fwd_Avg_Packets/Bulk,Fwd_Avg_Bulk_Rate,Bwd_Avg_Bytes/Bulk,Bwd_Avg_Packets/Bulk,Bwd_Avg_Bulk_Rate,Subflow_Fwd_Packets,Subflow_Fwd_Bytes,Subflow_Bwd_Packets,Subflow_Bwd_Bytes,Init_Win_bytes_forward,Init_Win_bytes_backward,act_data_pkt_fwd,min_seg_size_forward,Active_Mean,Active_Std,Active_Max,Active_Min,Idle_Mean,Idle_Std,Idle_Max,Idle_Min".split(
        ","
    );

const dict = {
    // src_ip: "x",
    // dst_ip: "x",
    // src_port: "x",
    dst_port: "Destination_Port",
    // protocol: "x",
    // timestamp: "x",
    flow_duration: "Flow_Duration",
    flow_byts_s: "Flow_Bytes/s",
    flow_pkts_s: "Flow_Packets/s",
    fwd_pkts_s: "Fwd_Packets/s",
    bwd_pkts_s: "Bwd_Packets/s",
    tot_fwd_pkts: "Total_Fwd_Packets",
    tot_bwd_pkts: "Total_Backward_Packets",
    totlen_fwd_pkts: "Total_Length_of_Fwd_Packets",
    totlen_bwd_pkts: "Total_Length_of_Bwd_Packets",
    fwd_pkt_len_max: "Fwd_Packet_Length_Max",
    fwd_pkt_len_min: "Fwd_Packet_Length_Min",
    fwd_pkt_len_mean: "Fwd_Packet_Length_Mean",
    fwd_pkt_len_std: "Fwd_Packet_Length_Std",
    bwd_pkt_len_max: "Bwd_Packet_Length_Max",
    bwd_pkt_len_min: "Bwd_Packet_Length_Min",
    bwd_pkt_len_mean: "Bwd_Packet_Length_Mean",
    bwd_pkt_len_std: "Bwd_Packet_Length_Std",
    pkt_len_max: "Max_Packet_Length",
    pkt_len_min: "Min_Packet_Length",
    pkt_len_mean: "Packet_Length_Mean",
    pkt_len_std: "Packet_Length_Std",
    pkt_len_var: "Packet_Length_Variance",
    fwd_header_len: "Fwd_Header_Length",
    bwd_header_len: "Bwd_Header_Length",
    fwd_seg_size_min: "min_seg_size_forward",
    fwd_act_data_pkts: "act_data_pkt_fwd",
    flow_iat_mean: "Flow_IAT_Mean",
    flow_iat_max: "Flow_IAT_Max",
    flow_iat_min: "Flow_IAT_Min",
    flow_iat_std: "Flow_IAT_Std",
    fwd_iat_tot: "Fwd_IAT_Total",
    fwd_iat_max: "Fwd_IAT_Max",
    fwd_iat_min: "Fwd_IAT_Min",
    fwd_iat_mean: "Fwd_IAT_Mean",
    fwd_iat_std: "Fwd_IAT_Std",
    bwd_iat_tot: "Bwd_IAT_Total",
    bwd_iat_max: "Bwd_IAT_Max",
    bwd_iat_min: "Bwd_IAT_Min",
    bwd_iat_mean: "Bwd_IAT_Mean",
    bwd_iat_std: "Bwd_IAT_Std",
    fwd_psh_flags: "Fwd_PSH_Flags",
    bwd_psh_flags: "Bwd_PSH_Flags",
    fwd_urg_flags: "Fwd_URG_Flags",
    bwd_urg_flags: "Bwd_URG_Flags",
    fin_flag_cnt: "FIN_Flag_Count",
    syn_flag_cnt: "SYN_Flag_Count",
    rst_flag_cnt: "RST_Flag_Count",
    psh_flag_cnt: "PSH_Flag_Count",
    ack_flag_cnt: "ACK_Flag_Count",
    urg_flag_cnt: "URG_Flag_Count",
    ece_flag_cnt: "ECE_Flag_Count",
    down_up_ratio: "Down/Up_Ratio",
    pkt_size_avg: "Average_Packet_Size",
    init_fwd_win_byts: "Init_Win_bytes_forward",
    init_bwd_win_byts: "Init_Win_bytes_backward",
    active_max: "Active_Max",
    active_min: "Active_Min",
    active_mean: "Active_Mean",
    active_std: "Active_Std",
    idle_max: "Idle_Max",
    idle_min: "Idle_Min",
    idle_mean: "Idle_Mean",
    idle_std: "Idle_Std",
    fwd_byts_b_avg: "Fwd_Avg_Bytes/Bulk",
    fwd_pkts_b_avg: "Fwd_Avg_Packets/Bulk",
    bwd_byts_b_avg: "Bwd_Avg_Bytes/Bulk",
    bwd_pkts_b_avg: "Bwd_Avg_Packets/Bulk",
    fwd_blk_rate_avg: "Fwd_Avg_Bulk_Rate",
    bwd_blk_rate_avg: "Bwd_Avg_Bulk_Rate",
    fwd_seg_size_avg: "Avg_Fwd_Segment_Size",
    bwd_seg_size_avg: "Avg_Bwd_Segment_Size",
    cwe_flag_count: "CWE_Flag_Count",
    subflow_fwd_pkts: "Subflow_Fwd_Packets",
    subflow_bwd_pkts: "Subflow_Bwd_Packets",
    subflow_fwd_byts: "Subflow_Fwd_Bytes",
    subflow_bwd_byts: "Subflow_Bwd_Bytes",
};

const indicesToRemove = [0, 1, 2, 4, 5].sort((a, b) => b - a);

const arrangeOne = (data) => {
    let arrangedData = Array(77).fill(0);
    capturedArrayFormat.forEach((capture, index) => {
        arrangedData[requiredArrayFormat.indexOf(dict[capture])] = data[index];
    });
    return arrangedData;
};

const arrangeMany = (data) => {
    return data.map((d) => arrangeOne(d));
};

const formatData = (data) => {
    let formattedData = [];
    data = data.split("\n");
    data = /\d/.test(data[0]) ? data.slice(0, -1) : data.slice(1, -1);
    data.forEach((d) => {
        d = d.slice(0, -1).split(",");
        for (let i = 0; i < indicesToRemove.length; i++) {
            d.splice(indicesToRemove[i], 1);
        }
        formattedData.push(arrangeOne(d));
    });
    return formattedData;
};

const formatFormCSV = (data) => {
    data = data.split(",");
    for (let i = 0; i < indicesToRemove.length; i++) {
        data.splice(indicesToRemove[i], 1);
    }
    return arrangeOne(data);
};

module.exports = { arrangeOne, arrangeMany, formatData, formatFormCSV };
