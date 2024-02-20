import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'components/Button/Button';
import Icon from 'components/Icon/Icon';
import Input from 'components/Input/Input';
import Modal from 'components/Modal/Modal';
import { GET_CHART_TITLES_QUERY_ID } from 'constants';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { createChart } from 'service/DashboardService/DashboardServices';
import { SavedChartConfigInterface } from './SavedChartTypes';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { getopenChart } from 'service/DashboardService/DashboardServices';

interface CreateChartModalProps {
  close: () => void;
  config: SavedChartConfigInterface;
  symbol: string;
  customKey: string;
  rangeselect: string
  chart_format : string
  B_S_Item: () => void
  handleDataFromFinance:()=>void
  

}

const CreateChartModal = ({ close, config, symbol, customKey, rangeselect,chart_format, B_S_Item,handleDataFromFinance ,onSuccessCallback}: CreateChartModalProps) => {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const mutation = useMutation(createChart);
  const [currentconfig,setCurrentconfig]=useState({})

  const sendData = (data) => {
    // Call the callback function to send data to the parent
    console.log(data,'crete');
    
    handleDataFromFinance(data);
  };


  const onSubmit = handleSubmit(({ title }) => {
  
    let chartConfig;

    if (config?.chart_items?.length === 1) {
      const item = {
        chart_items: [
          { displayValue: symbol, type: '', controlType: 'symbol' },
          {
            item_id: 'bs.as.reported.position_1',
            item_name: 'Cash & Equivalents',
            item_group: 'BALANCE_SHEET',
            item_type: "FINANCIAL",
            chart_item_symbol: symbol,
            item_component_type: "BAR",
            // item_color: "BLUE",
            item_additional_info: {
            },
            item_order: 1,
          }
        ],
        chart_range: config.rangedata,
        chart_format:chart_format ,
        toDate: config.toDate,
        fromDate: config.fromDate,
        chart_type:customKey,
      };
      chartConfig = item;
      chartConfig.chart_data_type = rangeselect
      
    } else {
      chartConfig = config;
    
      chartConfig.chart_range = config.rangedata; 
      chartConfig.chart_format = chart_format; 
      delete chartConfig.rangedata;
      chartConfig.chart_data_type = rangeselect;
   
    }
    

   
    

  

    return mutation.mutate(
      {
        title,
        chart_config: customKey === "FINANCIAL" ? chartConfig : config,
        symbol,
        chart_type: customKey === "FINANCIAL" ? "FINANCIAL":customKey === "ECONOMICS" ? "ECONOMICS" : "STOCK",
      },
      {
        onSuccess: async (data) => {
          // onSuccessCallback(true);
          queryClient.invalidateQueries(GET_CHART_TITLES_QUERY_ID);
          close();
          const url = new URL(location.href);

          url.searchParams.set("titles", title);
          router.push(url, undefined, { scroll: false });
          // B_S_Item(customKey === 'FINANCIAL' ? chartConfig : config);

          if (customKey === 'FINANCIAL') {
            const token = localStorage.getItem('token');
            const headers = {
              X_AUTH_TOKEN: token,
              'Content-Type': 'application/json',
            };
            try {
              const response = await axios.get(`https://api.donestat.co/rest/v1/getChartTitles?symbol=${symbol}&chart_type=${customKey}&page=1)`, { headers })
              if (response.status === 200) {
                console.log("First API response:", response)
                const extractedData = response.data[0][0];

                try {
                  const secondResponse = await getopenChart({
                    chart_id: extractedData,
                  });
                  sendData(secondResponse)
                  
    
                } catch (error) {
                  console.error("Error calling second API:", error);
              
                }
              }


            } catch (error) {
              console.error("Error calling another API:", error);
              // Handle the error from the second API call
            }
          }
          else if (customKey === 'ECONOMICS') {
            const token = localStorage.getItem('token');
            const headers = {
              X_AUTH_TOKEN: token,
              'Content-Type': 'application/json',
            };
            try {
              const response = await axios.get(`https://api.donestat.co/rest/v1/getChartTitles?chart_type=${customKey}&page=1)`, { headers })
              if (response.status === 200) {
                console.log("First API response:", response)
                const extractedData = response.data[0][0];

                try {
                  const secondResponse = await getopenChart({
                    chart_id: extractedData,
                  });
                  sendData(secondResponse)
                  
    
                } catch (error) {
                  console.error("Error calling second API:", error);
              
                }
              }
            } catch (error) {
              console.error("Error calling another API:", error);
              // Handle the error from the second API call
            }
          }
        },
      }
    );
  });
    
  return (
    <Modal close={close}>
      <p className="is-size-5 mb-3">Add a title to your chart</p>

      <form onSubmit={onSubmit}>
        <Input
          {...register('title', {
            required: 'Title is required',
          })}
          cSize="small"
          label="Chart Title"
          error={errors.title}
        />
        <div className="is-flex is-justify-content-flex-end ">
          <Button className="is-warning mt-3" size="small" type="submit">
            <Icon>
              <FaPlus />
            </Icon>
            <span>Save</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateChartModal;
