import pandas as pd
# import numpy as np
import argparse
import os
from IGTD_Functions import min_max_transform, table_to_image


def argument_parser():
    parser = argparse.ArgumentParser()
    parser.add_argument("filename", help="path to csv file")
    parser.add_argument("line_no", type=int, help="Line Number of CSV")
    parser.add_argument("-e", "--euclidean",
                        help="use euclidean distance", action="store_true")
    parser.add_argument("-m", "--manhattan",
                        help="use manhattan distance", action="store_true")
    args = parser.parse_args()
    return args.filename, args.line_no, args.euclidean, args.manhattan


if __name__ == "__main__":
    filename, line_no, euclidean, manhattan = argument_parser()
    num_row = 3
    num_col = 3
    num = num_row * num_col
    save_image_size = 3
    max_step = 1000
    val_step = 300
    df = pd.read_csv(filename)
    if "Label" in df.columns:
        df.drop("Label", axis=1, inplace=True)
    columns = list(df.columns.values)
    added_columns = ["01", "02", "03", "04"]
    columns.extend(added_columns)
    row_data = df.iloc[line_no]
    row_data["01"] = 0
    row_data["02"] = 0
    row_data["03"] = 0
    row_data["04"] = 0
    norm_row_data = min_max_transform(row_data)
    norm_row_data = pd.DataFrame(norm_row_data)
    norm_row_data = norm_row_data.values.reshape(1, num)
    norm_row_data = pd.DataFrame(norm_row_data)
    norm_row_data.columns = columns

    if euclidean:
        fea_dist_method = "Euclidean"
        image_dist_method = "Euclidean"
        error = "abs"
        result_dir = "Results/euclidean"
        os.makedirs(name=result_dir, exist_ok=True)
        table_to_image(
            norm_row_data,
            [num_row, num_col],
            result_dir,
        )

    if manhattan:
        # fea_dist_method = "Pearson"
        # image_dist_method = "Manhattan"
        # error = "squared"
        result_dir = "Results/manhattan"
        os.makedirs(name=result_dir, exist_ok=True)
        table_to_image(
            norm_row_data,
            [num_row, num_col],
            result_dir,
        )
