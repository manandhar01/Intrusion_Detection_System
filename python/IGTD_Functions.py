import pandas as pd
import numpy as np
import os
import shutil

def min_max_transform(data):
    norm_data = np.empty(data.shape)
    norm_data.fill(np.nan)
    min_v = min(data)
    max_v = max(data)
    for i, v in enumerate(data):
        v = (v - min_v) / (max_v - min_v)
        norm_data[i] = v
    return norm_data

def generate_image_data(data, num_row, num_column, image_folder=None, file_name=''):
    data = data.values
    if os.path.exists(image_folder):
        shutil.rmtree(image_folder)
    os.mkdir(image_folder)
    data_2 = data.copy()
    max_v = np.max(data_2)
    min_v = np.min(data_2)
    data_2 = 255 - (data_2 - min_v) / (max_v - min_v) * 255
    image_data = np.asarray(data_2).reshape(num_row, num_column)
    pd.DataFrame(image_data, index=None, columns=None).to_csv(image_folder+'/'+file_name+'.txt', header=None, index=None, sep='\t', lineterminator='\r\n')

def table_to_image(norm_d, scale, normDir):
    if os.path.exists(normDir):
        shutil.rmtree(normDir)
    os.mkdir(normDir)
    generate_image_data(
        data=norm_d, num_row=scale[0], num_column=scale[1], image_folder=normDir, file_name='test')
    